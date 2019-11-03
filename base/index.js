const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");

const PORT = 4000;

app.use(compression());

app.use(express.static(path.join(__dirname, "../app/build")));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const originsWhitelist = [
  "http://localhost:4000",
  "http://localhost:4200",
  "http://localhost:9000",
  "http://localhost:3000",
  "http://localhost:3002",
  "http://localhost:8100",
  "http://localhost:9001"
];

const corsOptions = {
  origin: (origin, callback) => {
    let isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

//Custom middleware for safari
app.use((req, res, next) => {
  let agent = req.headers["user-agent"];
  if (
    agent &&
    agent.indexOf("Safari") > -1 &&
    agent.indexOf("Chrome") == -1 &&
    agent.indexOf("OPR") == -1
  ) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
  }
  next();
});

global.db = require("./db/db");

db.loadModels();

db.installConnectionHandlers();

db.checkConnection(() => {
  //init routes
  app.get("/api/test", (req, res) => {
    res.status(200).send({
      message: "Test looks good!"
    });
  });

  app.get("/api/group", async (req, res) => {
    try {
      let groups = await db.Group.find({})
        .lean()
        .exec();
      if (!groups || !groups.length) {
        groups = [];
      }
      res.status(200).send({
        status: "success",
        data: groups
      });
    } catch (err) {
      res.status(500).send({
        message: "Internal Server Error"
      });
    }
  });

  app.post("/api/group", async (req, res) => {
    try {
      const name = req.body.name;
      const geoJSON = req.body.geoJSON;
      if (name && geoJSON) {
        const newGroup  = await db.Group(req.body).save();
        res.status(200).send({
          status: "success",
          data: newGroup
        });
      } else {
        throw new Error("Insufficent Parameters");
      }
    } catch (err) {
      res.status(500).send({
        message: (err && err.toString()) || "Internal Server Error"
      });
    }
  });

  app.put("/api/group", async (req, res) => {
    try {
      const _id = req.body._id;
      const name = req.body.name;
      const geoJSON = req.body.geoJSON;
      if (_id && name && geoJSON) {
        const newGroup = await db.Group.updateOne(
          { _id: _id },
          { $set: req.body },
          { new: true }
        ).exec();
        res.status(200).send({
          status: "success",
          data: newGroup
        });
      } else {
        throw new Error("Insufficent Parameters");
      }
    } catch (err) {
      res.status(500).send({
        message: (err && err.toString()) || "Internal Server Error"
      });
    }
  });

  app.delete("/api/group", async (req, res) => {
    try {
      const _id = req.body._id;
      if (_id) {
        await db.Group.remove({ _id: _id }).exec();
        res.status(200).send({
          status: "success",
          message: "Sucessfully Deleted"
        });
      } else {
        throw new Error("Insufficent Parameters");
      }
    } catch (err) {
      res.status(500).send({
        message: (err && err.toString()) || "Internal Server Error"
      });
    }
  });

  app.listen(PORT);
  console.log(`Listening on port ${PORT}`);
});

const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");

const PORT = 4000;

app.use(compression());

app.use(express.static(path.join(__dirname, "../app/build")));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
        await db.Group(req.body).save();
        res.status(200).send({
          status: "success",
          message: "Sucessfully Created"
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
        await db.Group.updateOne({ _id: _id }, { $set: req.body }).exec();
        res.status(200).send({
          status: "success",
          message: "Sucessfully Updated"
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

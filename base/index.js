const express = require("express");
const cors = require("cors");
const compression = require("compression");

const PORT = (process.env.PORT = 4000);

//global uncaughtException handler
process.on("uncaughtException", function(error) {
  if (error && error.stack) {
    console.error("uncaughtException: " + error.stack);
  } else {
    console.error("uncaughtException: " + error);
  }
});
//global unhandledRejection handler
process.on("unhandledRejection", function(reason, p) {
  console.error("unhandledRejection: " + reason);
  if (reason && reason.stack) console.error(reason.stack);
});

const app = express();

app.use(compression());
app.use(cors);

app.use(express.static(__dirname + "../app/build"));

app.listen(PORT, () => {
  console.log("Server is running at:", PORT);
});

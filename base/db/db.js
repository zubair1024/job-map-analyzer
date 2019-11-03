const mongoose = require("mongoose");
//get the default promise
mongoose.Promise = global.Promise;
const config = require("../titan-config");

// mongoose.set('debug', true);

module.exports = {
  mongoose: mongoose,
  dbURI: config.dbUrl,
  connect: function() {
    mongoose.connect(this.dbURI, {
      useMongoClient: true,
      server: {
        socketTimeoutMS: 0,
        // sets how many times to try reconnecting
        reconnectTries: Number.MAX_VALUE,
        // sets the delay between every retry (milliseconds)
        reconnectInterval: 1000
      }
    });
  },

  reconnect: function() {
    let me = this;
    console.log("reconnecting to mongo server");
    mongoose.connection.close(function() {
      mongoose
        .connect(me.dbURI)
        .then(() => {
          console.log("mongoose reconnected");
        })
        .catch(err => {
          // mongoose connection error will be handled here
          console.error("App starting error:", err.stack);
          process.exit(1);
        });
    });
  },

  // CONNECTION EVENTS
  installConnectionHandlers: function() {
    let me = this;
    // When successfully connected
    mongoose.connection.on("connected", function() {
      console.log("Mongoose connection open");

      //start logger
    });

    // If the connection throws an error
    mongoose.connection.on("error", function(err) {
      console.log("Mongoose connection error: " + err);
      me.reconnect();
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", function() {
      console.log("Mongoose connection disconnected");
    });

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", function() {
      mongoose.connection.close(function() {
        console.log("Mongoose connection disconnected through app termination");
        process.exit(0);
      });
    });
  },

  //check connection
  checkConnection: function(callback) {
    var me = this;
    if (
      mongoose.Connection.STATES.connected !== mongoose.connection.readyState
    ) {
      mongoose
        .connect(me.dbURI)
        .then(() => {
          callback();
        })
        .catch(err => {
          // mongoose connection error will be handled here
          console.error("App starting error:", err.stack);
          process.exit(1);
        });
    } else {
      callback && callback();
    }
  },
  //load models
  loadModels: function() {
    return new Promise(resolve => {
      this.Group = require("./models/Group");
      resolve(true);
    });
  }
};

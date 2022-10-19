const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/?authMechanism=DEFAULT&directConnection=true";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("mongoose has successfully connected..");
  });
};

module.exports = connectToMongo;

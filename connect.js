const mongoose = require("mongoose");
require("dotenv").config();

url = process.env.MONGO_URL;
async function connectToMongoose(url) {
  return mongoose.connect(url);
}

module.exports = { connectToMongoose };

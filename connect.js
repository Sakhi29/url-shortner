const mongoose = require("mongoose");
require('dotenv').config()

url = "mongodb+srv://admin-sakhi:WJGxzK2zx0b5sIrz@cluster0.egoec3k.mongodb.net/?retryWrites=true&w=majority"
async function connectToMongoose(url) {
    return mongoose.connect(url);  
}

module.exports = {connectToMongoose}
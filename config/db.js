const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config()

const db = "mongodb+srv://" + process.env.MONGO_USERNAME +  ":" + process.env.MONGO_PASSWORD +"@cluster0.acoof0c.mongodb.net/?retryWrites=true&w=majority"


const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};


module.exports = connectDB;
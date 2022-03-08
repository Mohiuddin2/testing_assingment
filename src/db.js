const mongoose = require("mongoose")


const url = process.env.URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
     console.log(`MongoDb Connected: ${conn.connection.host}`);
    } catch (error) {
    console.log("Sorry Connection timeout, Please check your connection", error.message)
  }
}
 

module.exports = connectDB;
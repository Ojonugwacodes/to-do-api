const mongoose = require("mongoose");

const connectDB  =  async () => {
    const uri = process.env.MONGO_URI;
    if(!uri) {
        console.log("MongoDB URI is not set");
        return
    }
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);;
    } 
};
module.exports = connectDB;
// db.js
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/giroscopiodb');
        console.log("DB is connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

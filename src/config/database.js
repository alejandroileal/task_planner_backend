import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@cluster0.nlaueot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Succesful database connection");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;

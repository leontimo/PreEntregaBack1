import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log(`base de datos conectada `);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

connectDB();

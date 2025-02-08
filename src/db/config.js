import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DATABASE = process.env.DATABASE_URL;

const connect = async () => {
  try {
    await mongoose.connect(DATABASE);
    console.log("Bases de datos conectada");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

connect();

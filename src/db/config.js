import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://backendleo13:4864856@cluster0.3ngs8.mongodb.net/proyecto_coder?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Bases de datos conectada");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

connect();

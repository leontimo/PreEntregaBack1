import fs from "fs/promises";
import path from "path";
import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { io } from "../app.js";
import { __dirname } from "../dirname.js";
import Product from "../models/product.model.js";

const productsRouter = Router();

// Pide todos los productos
productsRouter.get("/", async (request, response) => {
  const allProducts = await Product.find();

  response.json(allProducts);
});

// Pide un producto por id
productsRouter.get("/:pid", async (request, response) => {
  const { pid } = request.params;

  const productById = await Product.findById({ _id: pid });

  console.log(productById);

  if (!productById) {
    return { message: "Product not found", statusCode: 404 };
  }

  response.json(productById);
});

// Inserta un nuevo producto
productsRouter.post("/", async (request, response) => {
  const product = request.body;

  try {
    const newProduct = new Product(product);

    await newProduct.save();

    response.json({ message: "Producto generado con exito", statusCode: 201 });
  } catch (error) {
    console.log(error);
    response.json({ message: "Ocurrio un error", statusCode: 400 });
  }
});

productsRouter.put("/:pid", async (request, response) => {
  const { pid } = request.params;
  const productToEdit = request.body;

  try {
    const productById = await Product.findById({ _id: pid });

    if (!productById) {
      response.json({ message: "Producto no encontrado", statusCode: 404 });
    }

    productById.title = productToEdit.title;
    productById.description = productToEdit.description;
    productById.price = productToEdit.price;
    productById.stock = productToEdit.stock;
    productById.thumbnails = productToEdit.thumbnails;

    await productById.save();

    response.json({ message: "Producto editado con exito", statusCode: 200 });
  } catch (error) {
    console.log(error);
    response.json({ message: "Ocurrio un error", statusCode: 400 });
  }
});

productsRouter.delete("/:pid", async (request, response) => {
  const { pid } = request.params;

  try {
    const productToDelete = await Product.deleteOne({ _id: pid });

    if (productToDelete.deleteCount === 0) {
      response.json({ message: "Producto no encontrado", statusCode: 404 });
    }
    response.json({ message: "Producto eliminado con exito", statusCode: 200 });
  } catch (error) {
    response.json({ message: "Ocurrio un error", statusCode: 400 });
  }
});

export default productsRouter;

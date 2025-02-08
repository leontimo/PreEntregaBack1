import { Router } from "express";
import { __dirname } from "../dirname.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js"
import mongoose from "mongoose";

// Configuracion del router de carrito
const cartRouter = Router();


// Crea un nuevo carrito
cartRouter.post("/", async (request, response) => {
  const cart = request.body;

  try {
    const newCart = new Cart(cart);

    await newCart.save();

    response.json({ message: "Nuevo carrito generado", statusCode: 201 });
  } catch (error) {
    console.log(error);
    response.json({ message: "Ocurrio un error", statusCode: 400 });
  }
});

// Muestra todos los carritos
cartRouter.get("/", async (request, response) => {
  const allCarts = await Cart.find();

  response.json(allCarts);
});

// Muestra un carrito por ID
cartRouter.get("/:cid", async (request, response) => {
  const { cid } = request.params;

  const cartById = await Cart.findById({ _id: cid });

  if (!cartById) {
    return { message: "Carrito no encontrado", statusCode: 404 };
  }

  response.json(cartById);
});

// Inserta un producto en un carrito
cartRouter.post("/:cid/product/:pid", async (request, response) => {
  const { cid, pid } = request.params;

  try {
    const cartById = await Cart.findById({ _id: cid });

    const productById = await Product.findById({ _id: pid });
    
    cartById.products.push(productById)

    await cartById.save();

    response.json({ message: "Producto agregado al carrito", statusCode: 201 });
  } catch (error) {
    response.json({ message: "Ocurrio un error", statusCode: 400 });
  }
});

// Elimina un producto de un carrito
cartRouter.delete("/:cid/product/:pid", async (request, response) => {
  const { cid, pid } = request.params;

  try {
    const result = await Cart.updateOne(
      { _id: new mongoose.Types.ObjectId(cid) },
      {
        $pull: {
          products: {
            _id: new mongoose.Types.ObjectId(pid)
          }
        }
      }
    );

    if (result.modifiedCount === 0) {
      return response.json({ message: "No se encontró el producto o no se pudo eliminar", statusCode: 404 });
    }

    response.json({ message: "Producto eliminado con éxito", statusCode: 200 });
  } catch (error) {
    console.error(error); // Muestra el error para depuración
    response.json({ message: "Ocurrió un error", statusCode: 400 });
  }
});

// Vacia los productos de un carrito
cartRouter.delete("/:cid", async (request, response) => {
  const { cid } = request.params;

  try {
    await Cart.updateOne(
      { _id: new mongoose.Types.ObjectId(cid) },
      {
        $set: {
          products: []
        }
      }
    );

    response.json({ message: "Carrito vaciado con exito", statusCode: 200 });
  } catch (error) {
    console.error(error); // Muestra el error para depuración
    response.json({ message: "Ocurrió un error", statusCode: 400 });
  }
});


export default cartRouter;
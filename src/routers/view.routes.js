import { Router } from "express";
import Product from "../models/product.model.js"
import Cart from "../models/cart.model.js"

 export const viewsRoutes = Router();

 // Muestra todos los productos con su respectiva paginacion
 viewsRoutes.get("/products", async (request, response) => {
   let { page = 1, limit = 10 } = request.query;
   try {

     const products = await Product.paginate(
       {},
       { page: Number(page), limit: Number(limit)}
     );

     console.log(products)

     if(products.docs.length === 0){
      products.isEmpty = true;
     }

     if(products.docs.length > limit){
       products.hasNextPage = true;
     }

     products.nextPage = () => {
        return products.page + 1
     }

     response.render("realTimeProducts", {products})

   } catch (error) {
     response.status(500).json({ message: error.message });
   }
 });

// Muestra un carrito por ID
viewsRoutes.get('/carts/:cid', async (request, response) => {
  const { cid } = request.params;

  const cartById = await Cart.findById({ _id: cid });

  const products = cartById.products

  if (!cartById) {
    return { message: "Carrito no encontrado", statusCode: 404 };
  }
  
  response.render("realTimeCart", { products });
})
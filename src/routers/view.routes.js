import { Router } from "express";
import products from "../db/products.json" assert { type: "json" };
import Product from "../models/product.model.js";

export const viewsRoutes = Router();

viewsRoutes.get("/products", async (request, response) => {
  let { page = 1, limit = 10 } = request.query;
  try {
    const products = await Product.paginate(
      {},
      { page: Number(page), limit: Number(limit) }
    );

    if (products.docs.length === 0) {
      products.isEmpty = true;
    }

    if (products.docs.length > limit) {
      products.hasNextPage = true;
    }

    products.nextPage = () => {
      page += 1;
      products.page += 1;
      return products.page;
    };
    products.concurrentPage = () => {
      if (products.hasNextPage === false) {
        return products.page;
      }
      return products.page - 1;
    };

    response.render("realTimeProducts", { products });

    console.log(products.docs.length);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

viewsRoutes.get("/", (req, res) => {
  res.render("home", products);
});

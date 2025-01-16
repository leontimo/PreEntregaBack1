import { Router } from "express";
import products from "../db/products.json" assert {type: 'json'};

 export const viewsRoutes = Router();

 viewsRoutes.get('/', (req, res) => {
    res.render("home", products);
 })
 viewsRoutes.get('/products', (req, res) => {
    res.render("realTimeProducts");
 })
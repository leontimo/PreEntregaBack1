import fs from 'fs/promises'
import path from 'path';
import { Router } from "express";
import {v4 as uuidv4} from 'uuid';
import { io } from "../app.js";
import { __dirname } from '../dirname.js';

const productsRouter = Router();

// Sirve para probar que la ruta es correcta.
const filePath = path.join(__dirname, '../src/db/products.json');

// Pide todos los productos
productsRouter.get('/', async (request, response) => {
    const data = await fs.readFile(filePath, 'utf-8');

    response.json(JSON.parse(data))
})

// Pide un producto por su id
productsRouter.get('/:pid', async (request, response) => {
    const {pid} = request.params

    const data = await fs.readFile(filePath, 'utf-8');

    const products = JSON.parse(data)

    const product = products.find(product => product.id === pid)

    response.json(product)
})

productsRouter.post('/', async (request, response) => {
    const newProduct = request.body

    const { title, description, price } = newProduct;

    console.log(newProduct)

    const data = await fs.readFile(filePath, 'utf-8');

    const products = JSON.parse(data)

    products.push({id: uuidv4(), ...newProduct})

    await fs.writeFile(filePath, JSON.stringify(products), 'utf-8')

    io.emit("new-product", { title, description, price } );

    response.json({message: "Producto agregado al carrito!"})
})

productsRouter.put('/:pid', async (request, response) => {
    const updatedProduct = request.body

    const data = await fs.readFile(filePath, 'utf-8');

    const products = JSON.parse(data)

    const newDB = products.filter(product => product.id !== updatedProduct.id)

    newDB.push(updatedProduct)

    await fs.writeFile(filePath, JSON.stringify(newDB), 'utf-8')

    response.json({message: "Producto editado exitosamente"})
})

productsRouter.delete('/:pid', async (request, response) => {
    const {pid} = request.params

    const data = await fs.readFile(filePath, 'utf-8');

    const products = JSON.parse(data)

    const newDB = products.filter(product => product.id !== pid)

    await fs.writeFile(filePath, JSON.stringify(newDB), 'utf-8')

    response.json({message: "Producto eliminado exitosamente"})
})

export default productsRouter;
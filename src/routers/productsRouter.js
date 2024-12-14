const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const {v4: uuidv4} = require('uuid');

console.log(uuidv4)

const productRouter = express.Router()

// Sirve para probar que la ruta es correcta.
const filePath = path.join(__dirname, '../db/products.json');

// Pide todos los productos
productRouter.get('/', async (request, response) => {
    const data = await fs.readFile(filePath, 'utf-8');

    response.json(JSON.parse(data))
})

// Pide un producto por su id
productRouter.get('/:pid', async (request, response) => {
    const {pid} = request.params

    const data = await fs.readFile(filePath, 'utf-8');

    const products = JSON.parse(data)

    const product = products.find(product => product.id === pid)

    response.json(product)
})

productRouter.post('/', async (request, response) => {
    const newProduct = request.body

    console.log(newProduct)

    const data = await fs.readFile(filePath, 'utf-8');

    const products = JSON.parse(data)

    products.push({id: uuidv4(), ...newProduct})

    await fs.writeFile(filePath, JSON.stringify(products), 'utf-8')

    response.json({message: "Producto agregado al carrito!"})
})

productRouter.put('/:pid', async (request, response) => {
    const updatedProduct = request.body

    const data = await fs.readFile(filePath, 'utf-8');

    const products = JSON.parse(data)

    const newDB = products.filter(product => product.id !== updatedProduct.id)

    newDB.push(updatedProduct)

    await fs.writeFile(filePath, JSON.stringify(newDB), 'utf-8')

    response.json({message: "Producto editado exitosamente"})
})

productRouter.delete('/:pid', async (request, response) => {
    const {pid} = request.params

    const data = await fs.readFile(filePath, 'utf-8');

    const products = JSON.parse(data)

    const newDB = products.filter(product => product.id !== pid)

    await fs.writeFile(filePath, JSON.stringify(newDB), 'utf-8')

    response.json({message: "Producto eliminado exitosamente"})
})

// Configuracion del router de productos

// Las rutas de productos

// La logica de dichas rutas

module.exports = productRouter;
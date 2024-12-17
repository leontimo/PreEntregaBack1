const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const {v4: uuidv4} = require('uuid');

// Configuracion del router de carrito
const cartRouter = express.Router()

// Sirve para probar que la ruta es correcta.
const filePath = path.join(__dirname, '../db/cart.json');
const productsFilePath =  path.join(__dirname, '../db/products.json');

// Las rutas de carrito
cartRouter.post('/', async (request, response) => {
    const cart = request.body

    const data = await fs.readFile(filePath, 'utf-8');

    const carts = JSON.parse(data)

    carts.push({id: uuidv4(), ...cart})

    await fs.writeFile(filePath, JSON.stringify(carts), 'utf-8')

    response.json({message: "Nuevo carrito generado"})
})

cartRouter.get('/', async (request, response) => {
    const data = await fs.readFile(filePath, 'utf-8');

    const carts = JSON.parse(data)

    response.json(carts)
}) 

cartRouter.get('/:cid', async (request, response) => {
    const {cid} = request.params;

    const data = await fs.readFile(filePath, 'utf-8');

    const carts = JSON.parse(data)


    const cartById = carts.find(cart => cart.id == cid)

    response.json(cartById.products)
})

cartRouter.post('/:cid/product/:pid', async (request,response) => {
   const {cid, pid} = request.params;

   const cartData = await fs.readFile(filePath, 'utf-8');
   const productsData = await fs.readFile(productsFilePath, 'utf-8');

   const carts = JSON.parse(cartData)
   const products = JSON.parse(productsData)

   const product = products.find(product => product.id == pid)
   let cartById = carts.find(cart => cart.id == cid)
   console.log(cartById)
   
   const itemInCart = cartById.products.find(item => item.product == product.id)

   if(!itemInCart){
    cartById.products.push({product: product.id, quantity: 1})
   } else {
    let prevQuantity = itemInCart.quantity
    cartById = {...cartById, products: cartById.products.filter(item => item.product != itemInCart.product)}
    
    cartById.products.push({product: product.id, quantity: prevQuantity + 1})
   }
   
   const newCarts = carts.filter(cart => cart.id != cartById.id)
   newCarts.push(cartById)
   await fs.writeFile(filePath, JSON.stringify(newCarts), 'utf-8')
   
   response.json({message: "Producto agregado al carrito"})
})


module.exports = cartRouter;
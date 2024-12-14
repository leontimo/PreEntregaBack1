const productRouter = require('../routers/productsRouter')

// Configuracion del servidor
const express = require('express'); 

const server = express(); 
server.use(express.json())

// get -> localhost:8080/pepito  =   www.mercadolibre.com/pepito
// request -> es un objeto que me manda el front (peticion)
// response -> es un objeto que yo, desde el back, le mando al front (respuesta)
server.get('/', (request, response) => {
    response.send('Hola desde la ruta principal de mi app')
})

// La configuracion de los routers y las rutas -> carpeta routers

// La ejecucion de los routers
server.use('/api/products', productRouter);



module.exports = server;


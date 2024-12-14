const server = require('./server/server')

const PORT = 8080;

// Configuracion del server -> Se delega -> server.js

// Escuchar el server
server.listen(PORT, () => console.log(`Server funcionando en el puerto ${PORT}`))
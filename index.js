// PUNTO INICIAL DE NUESTRA APP DE NODE 
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')


// Crea el sv de express
const app = express() // el producto de express

// BASE DE DATOS MONGODB
dbConnection();

// CORS 
app.use(cors())

// DIRECTORIO PUBLICO
app.use(express.static('public')) // use = al middleware funcion que se ejecuta cuando alguien hace una peticion a nuestro servidor. Vamos a usar el express.static + nombre del directorio

// LECTURA Y PARSEO DEL BODY
app.use(express.json() ) // lee la info que posteamos , email . usuario

// RUTAS
app.use('/api/auth', require('./routes/auth')) // app.middleware use + ruta web + ruta archivo // lo que auth exporte se va a habilitar en la ruta api/auth
app.use('/api/events', require('./routes/events')) // app.middleware use + ruta web + ruta archivo // lo que auth exporte se va a habilitar en la ruta api/auth

// ESCUCHAR PETICIONES
app.listen(process.env.PORT, () => { // escuchar + puerto + 2do argumento en este caso callback `` + ${ puerto }
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})  







// * Ya podemos aceptar peticiones
// * crear crud de eventos para insertar ,actualizar , upgradear, etc


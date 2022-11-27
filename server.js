console.log("Hola Server");

//crear una const de tipo express que manejara los hilos de nuestro archivo server.js
const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');

//crear la conexion hacia la BD
const stringConnection = require("./db/dbConnection");
mongoose.connect (stringConnection)
  .then( () => console.log('Servidor MongoDB Up'))
  .catch( (err) => console.log('Error de conexion:'+ err))


//Creamos el parserBody de las peticiones HTTP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//importar las rutas de api para los End Points
const router = require('./routes/router')



//enviar la const router para que app la ejecute
app.use( '/api/v1',router )

//por medio de la const app activamos la escucha de nuestro server
app.listen(port, () => {
  console.log(`Server Port: ${port}`);
});

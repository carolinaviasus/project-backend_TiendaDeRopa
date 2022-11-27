const express = require('express');
const { createUser, getUsers, updateUser, deleteUser, userLogin } = require('../controllers/UserController');
const router = express.Router()

//Ruta de prueba //peticion
router.get('/', (req , res) => {
    res.send({message:'Hello World!!!! My First API '});
});
  
//Operaciones CRUD......ToDo
//Crear Usuario - Create EndPoint- C
router.post("/createUser", createUser )
//Leer Usuario - Read - R
router.get("/get-users", getUsers);
// Actualizar usuario enpoint //Editar Usuario - Update - U
router.put('/update-user/:id', updateUser)
//Eliminar Usuario - Delete - D
router.delete('/deleteUser/:id', deleteUser)

router.post("/login", userLogin ) //rutadeLogin

module.exports = router
  
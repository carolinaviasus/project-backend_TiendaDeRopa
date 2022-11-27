const User = require("../models/UserModel");
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = 'MisionTic2022'

const createUser = (req, res) => {
  const { body } = req;
  // const { firstname, lastname, email, password } = body
  const newUser = new User({
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email.toLowerCase(),
    password: body.password,
  });
  // res.send (newUser)
  // res.send( { message: 'Create Useron' } )

  // opcion 1 con el async y await, no olvidar colocar async en la funcion
  // const result = await newUser.save();
  // console.log ( result )

  // opcion 2 funcion callback como parametro

  //   newUser.save((err, userSaved ) => {
  //       if(userSaved){
  //           res.status(200).send({message: 'Usuario creado con exito'})
  //       }else if (!userSaved){
  //           res.send({message: 'ERROR AL GUARDAR usuario '})
  //       } else {
  //           res.status(500).send({message: `Error del servidor: ${err}`})
  //       }
  //   })

  // opcion 3 guardando un usuario con el formato tipo promise
  //////////RESUMIDA
  //   newUser.save()
  //     .then((userSaved) => res.status(200).send({ message: "Usuario guardado con éxito", user: UserSaved })  )
  //     .catch((err) => res.status(500).send({ message: `Error del servidor: ${err}` }));

  // opcion guardando un usuario con el formato undefined
  // newUser.save();

  User.findOne({ email: newUser.email }, (err, userFinded) => {
    if (userFinded) {
      res.send({ message: "Usuario ya existe, con ese email" });
    } else if (!userFinded) {
      //antes de guardar usuario inciptar el password
      const password = newUser.password + salt; //agregar nivel de seguridad
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          res.send({ message: "Error del servidor:" + err });
        }
        if (!hash) {
          res.send({ message: "Error al encriptar el password" });
        } else {
          newUser.password = hash;
          newUser.save((err, userSaved) => {
            if (userSaved) {
              res.status(200).send({ message: "Usuario creado con exito", user: userSaved });
            } else if (!userSaved) {
              res.send({ message: "ERROR AL GUARDAR usuario " });
            } else {
              res.status(500).send({ message: `Error del servidor: ${err}` });
            }
          });
        }
      });
    } else {
      res.send({ message: `Error del servidor: ${err}`, status: 500 });
    }
  });

  // opcion 4 guardando un usuario con el formato tipo callback
  //    newUser.save( (err, userStored) => {
  //        if(userStored){
  //            res.send ( {message: 'Usuario creado con exito',} )
  //        }
  //        if(err){
  //            res.send( { message: 'Error del servidor' } )
  //        }
  //    })
  //  }
  // })
  //         if(err){
  //             res.send( { message: 'Error del servidor'})
  //         }
  //     } )
  // })
};
const updateUser = (req, res) => {
  const idToUpdate = req.params.id;
  const { body } = req;
  const userToUpdate = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email.toLowerCase(),
    password: body.password,
  };

  //buscar que el email no se repita
  User.findOne({ email: userToUpdate.email }, (err, userFinded) => {
    if (err) {
      res.status(500).send("Error del servidor");
    } else if (userFinded) {
      if (userFinded.id !== idToUpdate) {
        res.send({ message: "Email ya esta en uso", user: userFinded });
      } else {
        User.findByIdAndUpdate(
          idToUpdate,
          userToUpdate,
          { new: true },
          (err, userUpdated) => {
            if (err) {
              res.send({ message: `Error del servidor: ${err}` });
            } else if (!userUpdated) {
              res.send({ message: "Usuario no encontrado" });
            } else {
              res
                .status(200)
                .send({
                  message: "Usuario actualizado con exito op1",
                  user: userUpdated,
                });
            }
          }
        );
      }
    } else {
      User.findByIdAndUpdate(
        idToUpdate,
        userToUpdate,
        { new: true },
        (err, userUpdated) => {
          if (err) {
            res.send({ message: `Error del servidor: ${err}` });
          } else if (!userUpdated) {
            res.send({ message: "Usuario no encontrado" });
          } else {
            res
              .status(200)
              .send({
                message: "Usuario actualizado con exito op2",
                user: userUpdated,
              });
          }
        }
      );
    }
  });
};
const getUsers = (req, res) => {
  User.find({}, (err, docs) => {
    if (docs) {
      res.status(200).send({ docs: docs });
    } else if (!docs) {
      res.send({ message: " no hay documentos en la seleccion" });
    } else {
      res.send({ message: `Error del servidor: ${err}` });
    }
  });
};
const deleteUser = (req, res) => {
  const idToDelete = req.params.id;

  //declaramos la query finOneand remove para eliminar
  User.findOneAndRemove({ _id: idToDelete }, (err, userDeleted) => {
    if (err) {
      res.send({ message: "Error del servidor: " + err });
    } else if (!userDeleted) {
      res.send({ message: "Usuario no existe en la base de datos" });
    } else {
      res.send({ message: "Usuario eliminado con exito", user: userDeleted });
    }
  });
};

//toDo:loguear Usuario
const userLogin = (req, res) => {
  //comprobar la identidad del usuario
  //instrucciones para loguear usuario
  const { body } = req
  const { email , password } = body

   //encontrar una coincidencia con el email
   User.findOne( { email: email.toLowerCase() }, (err, userFinded) => {   //USERMATCH O userfinded
    if(err){
      res.send( { message: 'Error del servidor: ' + err } )
    }else if(!userFinded){
      res.send( { message: 'Usuario o Password invalido' } )
    }else {
      res.send({message:'usuario encontrado'})
      //si el usuario fue encontrado verificamos que los password coincidan con la funcion compare de bcrypt
      const passwordToCompare = password + salt //agregamos el valor de salt al password que viene en el body
    }
  })
}

//funcion para actualizar usuario en el endPoint update
function userFindAndUpdate(id, user, res) {
  User.findByIdAndUpdate(id, user, { new: true }, (err, userUpdated) => {
    if (err) {
      res.send({ message: `Error del servidor: ${err}` });
    } else if (!userUpdated) {
      res.send({ message: "Usuario no encontrado" });
    } else {
      res.status(200).send({
        message: "Usuario actualizado con exito",
        user: userUpdated,
      });
    }
  });
}

module.exports = {
  createUser,
  updateUser,
  getUsers,
  deleteUser,
  userLogin,
};

//para crear un modelo, necesitas una const tipo mongoose
const mongoose = require('mongoose')
const { Schema } = mongoose

let UserSchema = new Schema( {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    rol: { type: Number, default: 2 },
    createDate: {
        type: Date ,
        default: Date.now
    }
} )

module.exports = mongoose.model('User', UserSchema, 'Users')
//de donde como se llama y lo voy a referenciar
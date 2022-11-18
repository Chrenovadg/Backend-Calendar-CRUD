const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({ // usuario con la info que necesito. Cualquier obj de nuestros usuarios va a tener el name
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true // campo unico no pueden haber correos duplicados
    },
    password:{
        type: String,
        required: true,
    },
})

// Exportamos para cuando necesitemos trabajar con usuarios usemos el esquema de arriba (MODEL)
module.exports = model('Usuario', UsuarioSchema)
const { Schema, model } = require('mongoose')

const EventoSchema = Schema({ // usuario con la info que necesito. Cualquier obj de nuestros usuarios va a tener el name
    title: {
        type: String,
        required: true,   
    },
    notes: {
        type: String, 
    },
    start: {
        type: Date, 
        required: true,   
    },
    end: {
        type: Date, 
        required: true,   
    },
    user: {
        type: Schema.Types.ObjectId, // le dice a mongoose que va a hacer una referencia y la especificamos abajo
        ref: 'Usuario', // es el nombre del OTRO ESQUEMA Usuario.js que esta tambien en models
        required: true, 
    },
})

// ACA podemos hacer modificaciónes adicionales. Cosas que se serializen asi se sobreescriben y cambian

EventoSchema.method('toJSON', function() {
    // extrayendo la version y el _id y todolodemas... almacenado en object(title, start, end etc)
    const { __v, _id, ...object } = this.toObject(); // aca tengo acceso a mi array con los objetos titulo , id ,nombre , fecha start y end
    object.id = _id;
    return object;
})

// Exportamos para cuando necesitemos trabajar con usuarios usemos el esquema de arriba (MODEL)
module.exports = model('Evento', EventoSchema)
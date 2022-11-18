const { response } = require('express')
const Evento = require('../models/Evento')


// --- OBTENIENDO EVENTOS --- 
const getEventos = async(req, res = response) => { // router + peticion que esperamos get +2do argumento req(request) , res(response) / posteo de info
    // RETORNANDO lista de todos los eventos
    const eventos = await Evento.find()
    .populate('user', 'name'); // rellenando datos de usuario
    
    
    
    res.json({
        ok: true,
        eventos // para que me retorne los eventos
    })
}


// --- CREANDO EVENTOS --- 
const crearEventos = async ( req, res = response) => {    
    const evento = new Evento(req.body)
    evento.user = req.uid;
    
    
    try {
        const eventoGuardado = await evento.save() // .4 guardando el evento y si todo sale bien...
        
        res.json({ // 5. respondo con el json diciendo que si se grabo y el evento guardado del punto 4 arriba de este.
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin :u'
        });
    }
}



// --- ACTUALIZANDO EVENTOS --- 
const actualizarEvento = async( req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    
    
    try {
        // verificando que esto existe en la base de datos:
        const evento = await Evento.findById( eventoId )

        if( !evento ) { // si el evento no existe ...
            return res.status(404).json({
                ok: false,
                msg: 'evento no existe por ese id'
            })
        }       

        // verificando quien quiere actualizar el evento es la misma persona que lo creo:
        if(evento.user.toString() !== uid ) { //string del ID:  si el usuario del evento es diferente del uid significa que alguien diferente del creador de la nota quiere editarla
            return res.status(401).json({
                ok: false,
                msg: 'no tiene el privilegio de editar este evento'
            });
        }

        // SI LLEGA A ESTE PUNTO , es la persona correcta la que quiere editar la nota: 
        const nuevoEvento = {
            ...req.body, // me manda el title,note,body etc
            user: uid // en la peticion no venia el uid del usuario por eso lo coloco aca
        }

        // ya tengo la nueva data , hora de actualizarla:
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} ) // id del evento que quiero actualizar + nueva data a guardar + {evento actualizado}
        
        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin :u de nuevo xD'
        });

    }
}



// --- ELIMINANDO EVENTOS --- 
const eliminarEventos = async( req, res = response) => {
    
    const eventoId = req.params.id;
    const uid = req.uid;
    
    
    try {
        // verificando que esto existe en la base de datos:
        const evento = await Evento.findById( eventoId )

        if( !evento ) { // si el evento no existe ...
            return res.status(404).json({
                ok: false,
                msg: 'evento no existe por ese id'
            })
        }       

        // verificando quien quiere actualizar el evento es la misma persona que lo creo:
        if(evento.user.toString() !== uid ) { //string del ID:  si el usuario del evento es diferente del uid significa que alguien diferente del creador de la nota quiere editarla
            return res.status(401).json({
                ok: false,
                msg: 'no tiene el privilegio de editar este evento'
            });
        }

        
        await Evento.findByIdAndDelete( eventoId ) 
        res.json({ ok: true });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin :u de nuevo xD'
        });
    }
}



module.exports = { 
    getEventos,
    crearEventos,
    actualizarEvento,
    eliminarEventos,
}

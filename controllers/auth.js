// funciones que tenia definidas en auth de rutes
// REQ = REQUEST, lo que solicitan ***** REP = RESPONSE, lo que respondemos

const { response } = require('express') // para no perder el intelincens que tiene la response de res.json para que ande xD
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')


const crearUsuario = async(req, res = response) => { // router + peticion que esperamos get +2do argumento req(request) , res(response) / posteo de info
    
    const {name, email, password} = req.body  // es la info que ahora se manda en const usuario
    
    try {
        let usuario = await Usuario.findOne({ email }) // let xq voy a reutilizarlo despues. Trabaja como una promesa
        console.log(usuario)

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya está registrado.'
            })
        }

        usuario = new Usuario(req.body) // si el usuario nuevo no existia , esto lo registra como uno nuevo
        
        // ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password, salt ) // la pass del usuario se encripta con salt bcrypt
        
        await usuario.save(); // CREAR USER promesa que regresa la data del usuary la guarda. Se espera hasta guardarse (await) 

        // Generar JWT json web token
        const token = await generarJWT( usuario.id, usuario.name ) // me pide el id y el name del usuario. Espero con promesa


        res.status(201).json({ // creamos una respuesta . st200 se creo correctamente
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token // token es = al valor del token
        })
    
    } catch (error) {
            res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
    }
}



const loginUsuario = async(req, res = response) => { // /AUTH posteo   
    const {email, password } = req.body



    try { 
        const usuario = await Usuario.findOne({ email }) 
        console.log(usuario)

        if (!usuario) { // si el USUARIO NO EXISTE ..
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese Email'
            });
        }
    // confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password) // password del user comparado con el almacenado en la base de datos
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Pass Incorrecta'
            });
        }

    // Generar JWT json web token
    const token = await generarJWT( usuario.id, usuario.name ) // me pide el id y el name del usuario. Espero con promesa

    res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    })

    } catch (error) {
            res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin xd'
        });
    }
}


const revalidarToken = async(req, res = response) => { // router + peticion que esperamos get +2do argumento req(request) , res(response) / posteo de info
    
    const {uid, name} = req
    // GENERAR JWT
    const token = await generarJWT( uid, name )

    res.json({ // creamos una respuesta 
        ok: true,
        token
    })
}

// Exportacion de la constante pero en modo ECMA script de Node
module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
 }

 /* 
 1. res.json = respondeme en .json para verlo mas facil
 2. mapped() // asi los veo serealizados en un obj facil de trabajar
 
 */
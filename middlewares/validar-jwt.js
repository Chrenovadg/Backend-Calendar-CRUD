const { response } = require("express")
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
    // x-token headers: es donde pido mis tokens
    const token = req.header('x-token')
    console.log(token)

    // como leamos el token tiene que ser igual como lo generamos . Validamos si el token no viene
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid, name} = jwt.verify( // const payload  xq me interesa saber el uid del usuario para saber cual user es. La firma verifica que sea igual como fue generada
            token, 
            process.env.SECRETE_JWT_SEED  // secret o public seed que tenemos en la variable de entorno .env
        )

        req.uid = uid
        req.name = name
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no Valido'
        })
    }

    next();
}



module.exports = {
    validarJWT
}
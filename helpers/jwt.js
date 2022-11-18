const jwt = require('jsonwebtoken')

const generarJWT = (uid, name) => { // Deberia recibir el payload de mi token + 
    return new Promise( ( resolve, reject ) => {
        const payload = { uid, name };

    // jwt + firma + payload + VARIABLE Entorno con private seed para firmar tokens + opciones de duracion del token + error reject + resolve token
        jwt.sign(payload, process.env.SECRETE_JWT_SEED, {  // firmamos con la palabra secreta
            expiresIn: '2h' 
        }, (err, token) => { // + Callback que se dispara con un error + token 
            if(err) { // si existe un error ,llamo el reject marcando nuestro error.
                console.log(err)
                reject('No se pudo generar el token')
            }
            // Pero si fue correcto todo .. recibo mi token.
            resolve(token)
        }) 
    })
}

module.exports = {
    generarJWT
}
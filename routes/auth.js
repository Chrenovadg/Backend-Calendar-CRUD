/*  Rutas de usuarios / Auth 
    host + /api/auth
 */

const { Router } = require('express')
const { check } = require('express-validator') // middle que valida un campo a la vez
const { validarCampos } = require('../middlewares/validar-campos');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth'); // despachando nuestras funcion de auth.js en controllers
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



// ESTAS SON NUESTRAS RUTAS Y ENDPOINTS (respuestas) (?). Faltan sus validaciones

router.post( // /ruta + [col. de middlewares] + const del endpoint
    '/new', 
    [ // middlewares
    check('name', 'El Nombre es Obligatorio').not().isEmpty(), // campo requerido + msj de error + que no este vacio
    check('email', 'El Email es Obligatorio').isEmail(), // campo requerido + msj de error + esUnEmail
    check('password', 'El Password debe ser de 6 caracteres mínimo').isLength({min: 6}), // campo requerido + msj de error + es de 6 carac minimo 
    validarCampos
    ],
    crearUsuario); 

// LOGIN
router.post( 
  '/', 
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  loginUsuario); 


// NECESITO saber si el jwtoken es valido. renew si es llamado verifica nuestro token, realiza un procedimiento y trae un nuevo jwt
// el cliente lo recibe y va a tener que actualizarle el que tiene en su app por el que va a generar este renew , para prolongar
// 2hs mas el que este logeado. Aunque cierren la pagina por esas 2hs sigue manteniendolo logeado hasta que terminen.

// --- Recibir nuevo token y revalidarlo
router.get('/renew', validarJWT, revalidarToken);


// Para habilitar esta ruta existente
module.exports = router;

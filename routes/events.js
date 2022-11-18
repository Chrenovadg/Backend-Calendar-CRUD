// CREANDO TODO EL CRUD: Create, read, update, delete. RUTA: /api/events
const { Router } = require('express'); // 1
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEventos, actualizarEvento, eliminarEventos } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router(); 

// Validando JWT
router.use(validarJWT) // cualquier peticion abajo de esto , va a tener validado su token. Si dejara un router arriba de esto , seria una ruta publica esa solita y las de abajo privadas :o

// Obtener Evento
router.get('/',getEventos );

// Crear Evento
router.post('/',
    [
        check('title', 'El titulo es Obligatorio').not().isEmpty(), // necesito que siempre tenga info (por el not is empty)
        check('start', 'Fecha de inicio es OBLIGATORIA.').custom( isDate ), // custom helper + callback que valida la fecha
        check('end', 'Fecha de finalización es OBLIGATORIA.').custom( isDate ), 
        validarCampos // desde aca no pasar los errores
    ],
    crearEventos 
 )

// Actualizar Evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento);  

// Borrar Evento
router.delete('/:id', eliminarEventos ) 


module.exports = router; 
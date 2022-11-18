// CUSTOM VALIDATOR
const moment = require('moment')

const isDate = (value, rest) => { // imprimo en consola los argumentos que recibe
    if(!value){ // si esta funcion regresa false este campo no es correcto
        return false;
    }

    const fecha = moment(value);
    if(fecha.isValid() ) {
        return true;
    } else {
        return false;
    }
}





module.exports = {
    isDate
}
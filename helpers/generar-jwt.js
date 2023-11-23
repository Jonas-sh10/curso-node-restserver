const jwt = require('jsonwebtoken');

// Esta función `generarJWT` debe ser una promesa. Recibe como argumento el ID de usuario.
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}

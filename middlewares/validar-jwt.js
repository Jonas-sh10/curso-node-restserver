const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No existe Token en la peticion'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // Leer el usuario que corresponde al UID
        const usuario = await Usuario.findById(uid);
        
        // Verificar si el usuario no existe o está borrado
        if (!usuario) {
            return res.status(401).json({
                msg: 'El token no es válido - usuario borrado de la DB'
            })
        }

        // Verificar que el usuario tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'El token no es válido - usuario con estado false'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no Válido'
        })
    }
}

module.exports = {
    validarJWT
}

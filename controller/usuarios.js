const { response } = require('express');

const usuariosGet = (req = request, res = response) => {
    const {q,nombre = 'no envia',apikey} = req.query;
    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey
    });
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put API - controller',
        id
    });
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API - controller',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}

// Se exporta un objeto porque va a haber muchos controladores
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}

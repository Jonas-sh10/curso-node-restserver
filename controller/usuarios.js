const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
};  

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    // Excluyo password, google y correo (que no se actualizan) y almaceno el resto
    const {_id, password, google, correo, ...resto} = req.body;

    // Por hacer: validar id contra la DB

    if (password) {
        // Encriptar la contraseña en caso que venga en el body
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password);
    }

    // Actualiza el registro: lo busca por id y actualiza con los valores de resto
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controller',
        usuario
    });
}

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si existe el correo
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // Cantidad de vueltas que hará la encriptación (por defecto 10)
    usuario.password = bcryptjs.hashSync(password); // Encripta el password

    await usuario.save(); // Esto es para grabar en la BD

    res.json({
        msg: 'post API - controller',
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    // borrado lógico:
    //const usuario = await Usuario.findByIdAndDelete(id);
    //borrado logico:
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json({
        usuario
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

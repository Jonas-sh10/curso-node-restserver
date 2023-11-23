const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
    // Verificar si el usuario existe en el request
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere validar el Rol, sin validar token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    // Verificar si el rol es ADMIN_ROLE
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es Administrador - No está autorizado`
        });
    }

    // Si pasa las validaciones, permitir el acceso
    next();
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere validar el Rol, sin validar token primero'
            });
        }
        // ojo: en roles están ingresando los roles admitidos (admin, ventas)
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El sistema requiere uno de estos roles ${roles}`
            });
        }
        next(); // Agrega los paréntesis para llamar a la función next
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}

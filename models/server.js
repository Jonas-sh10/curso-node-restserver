const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        // Define el puerto
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        // Llamada a conectarDB
        this.conectarDB();
        // Middleware
        this.middlewares();
        // Rutas de la aplicación
        this.routes();
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }      
    
    async conectarDB() {
        await dbConnection();
    }

    // Aquí se define el método middleware que publicará la carpeta public
    middlewares(){
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body recibe lo que se envía
        this.app.use(express.json());
        // Directorio público
        this.app.use(express.static('public'));
    }    

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;

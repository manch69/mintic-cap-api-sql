const express = require('express');

let librosController = require('../controllers/LibrosController')

let libros = express.Router();

    libros.route('/libros')
        .get(librosController.readAll);

    libros.route('/libros/:id') // /:id
        .get(librosController.readById);

    libros.route('/libros')
        .post(librosController.create);

    libros.route('/libros/:id')
        .delete(librosController.deleteOne);
    
    libros.route('/libros')
        .delete(librosController.deleteAll);

    libros.route('/libros/:id')
        .put(librosController.update);
    
    libros.route('/libros')
        .put(librosController.updateJorge);

module.exports = libros;
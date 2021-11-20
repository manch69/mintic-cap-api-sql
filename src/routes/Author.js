const express = require('express');

let autorController = require('../controllers/AuthorController')

let autor = express.Router();

    autor.route('/autor')
        .get(autorController.readAll);

    autor.route('/autor/:id') // /:id
        .get(autorController.readById);

    autor.route('/autor')
        .post(autorController.create);

    autor.route('/autor/:id')
        .delete(autorController.deleteOne);
    
    autor.route('/autor')
        .delete(autorController.deleteAll);

    autor.route('/autor/:id')
        .put(autorController.update);
    
module.exports = autor;
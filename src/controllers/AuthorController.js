const connDB = require('../connectionDB/ConnDB');


// read -> GET
exports.readAll = async function (req, res) {

    try {
        const respuesta = await connDB.query('SELECT * from autores');
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows); 
    }
    catch (err) {
        console.log(err);
    }
};

// read one-> GET
exports.readById = async function (req, res) {
    const id = parseInt(req.params.id); // autores/id ej: autores/1
    //const id_autor = parseInt(req.query.idautor); // autores/id ej: autores/1?idautor=2
    //console.log(id_autor);
    try {
        const respuesta = await connDB.query('SELECT * from autores WHERE id = $1', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}

// create one-> POST
exports.create = async function (req, res) {

    const {nombre} = req.body;
    
    try {
        const response = await connDB.query('INSERT INTO autores (nombre) VALUES ($1) ', [nombre]);

        res.json({
            message: 'Autor agregado',
            body: req.body
        });
    }
    catch (err) {
        console.log(err);
    }

};

// delete one-> DELETE
exports.deleteOne = async function (req, res) {
    //console.log('DELETE');
    const id = parseInt(req.params.id) // autores/id ej: autores/1
    try {
        const respuesta = await connDB.query('DELETE from autores WHERE id = $1', [id]);
        //console.log(respuesta.rows);
        res.json({
            message: 'Autor Eliminado',
            body: {
                libro: { id }
            }
        })
    }
    catch (err) {
        console.log(err);
    }

};

// delete one-> DELETE
exports.deleteAll = async function (req, res) {
    console.log('DELETE ALL');
    try {
        const respuesta = await connDB.query('DELETE from autores');
        console.log(respuesta.rows);
        res.json({
            message: 'Eliminados',
            body: {
            }
        })
    }
    catch (err) {
        console.log(err);
    }

};

// create one-> POST
exports.update = async function (req, res) {
    const id = parseInt(req.params.id)

    const { descripcion, nombre } = req.body;

    const response = await connDB.query('UPDATE autores SET nombre = $1 WHERE id = $2 ', [nombre, id]);
    console.log(response);
    res.json({
        message: 'Libro Modificado',
        body: {
            libro: req.body
        }
    })
};
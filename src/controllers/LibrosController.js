const connDB = require('../connectionDB/ConnDB');


// read -> GET
exports.readAll = async function (req, res) {

    try {
        const respuesta = await connDB.query('SELECT * from libros');
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows); 
    }
    catch (err) {
        console.log(err);
    }
};

// read one-> GET
exports.readById = async function (req, res) {
    const id = parseInt(req.params.id); // libros/id ej: libros/1
    //const id_autor = parseInt(req.query.idautor); // libros/id ej: libros/1?idautor=2
    //console.log(id_autor);
    try {
        const respuesta = await connDB.query('SELECT * from libros WHERE id = $1', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}

// create one-> POST
exports.create = async function (req, res) {

    const {descripcion, nombre} = req.body;
    
    try {
        const response = await connDB.query('INSERT INTO libros (descripcion, nombre) VALUES ($1, $2) ', [descripcion, nombre]);

        res.json({
            message: 'Libro agregado',
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
    const id = parseInt(req.params.id) // libros/id ej: libros/1
    try {
        const respuesta = await connDB.query('DELETE from libros WHERE id = $1', [id]);
        //console.log(respuesta.rows);
        res.json({
            message: 'Libro Eliminado',
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
        const respuesta = await connDB.query('DELETE from libros');
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

    const response = await connDB.query('UPDATE libros SET nombre = $1, descripcion = $2 WHERE id = $3 ', [nombre, descripcion,  id]);
    console.log(response);
    res.json({
        message: 'Libro Modificado',
        body: {
            libro: req.body
        }
    })
};

// create one-> POST
exports.updateJorge = async function (req, res) {
    //const id = parseInt(req.params.id)

    const { descripcion, nombre, id } = req.body;

    const response = await connDB.query('UPDATE libros SET nombre = $1, descripcion = $2 WHERE id = $3 ', [nombre, descripcion,  id]);
    console.log(response);
    res.json({
        message: 'Libro Modificado',
        body: {
            libro: req.body
        }
    })
};
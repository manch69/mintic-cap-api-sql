Capacitacion API REST CRUD NOSQL 
=============================
### Por: Miguel Noriega

Esta capacitacion se dicto el dia 18 de noviembre del 2021,
bajo el marco del programa Mision Tic 2022, en el alma mater UIS.

La grabacion de dicha capacitacion puede ser encontrada en la seccion de Bienestar estudiantil.

# Pasos para crear una API REST CRUD SQL
1. Crear proyecto node
    ```
    npm init
    ```

2. Instalar dependencias
    ```
    npm install express morgan pg
    ```
3. Instalar dependencias para Desarrollo
    ```
    npm install nodemon -D
    ```
4. Crear Estructura de Proyecto API, por capas.
    - src
        - controllers
        - routes
        - connectionDB

5.  Crear index.js (NOTA: Por organizacion se recomienda una carpeta src).

6. EXTRA:
    Para simular un entorno de produccion con sus variables de entorno es necesario:
    1. Instalar
    ```
    npm install dotenv
    ```
    2. Agregar esta linea de codigo a index.js
    ```js
    require('dotenv').config()
    ```
    3. Crear un archivo llamado .env, en la raiz del proyecto.
        La estructura del proyecto puede verse como:
    
        - node_modules      (Carpeta)
        - src               (Carpeta)
        - .env              (Archivo)
        - package-lock.json (Archivo)
        - package.json      (Archivo)

## Utils:

1. index.js (Plantilla)

```js
require('dotenv').config() // Requiere npm install dotenv 
const express = require('express'); 
const morgan = require('morgan'); //Ver requests en consola 
const app = express();

// settings
app.set('port', process.env.PORT || 4000); //Setear puerto, ej: localhost:4000

// middlewares
app.use(morgan('dev')); //Ver request en consola 
app.use(express.urlencoded({extended: false})); //body post form HTML 
app.use(express.json()); //JSON documents

//Routes
//Cambiar ENTIDAD, 
//app.use('/api', require('./routes/ENTIDAD'));
//app.use('/api', require('./routes/Libro')); //Ejemplo de una entidad llamada Libro

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
```
2. ConnectionDB (Plantilla)

```js
const { Pool } = require('pg'); //pg driver Postgresql

const config = {

    //connectionString: 'postgres://pdfwufyyqvwnsm:8fbd20a8f636b0e9cc62db1cb776d9b6ff34d72f01388b5005bc3cc438aa53ec@ec2-34-199-224-49.compute-1.amazonaws.com:5432/dca4snpoukm9h8',
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};
const connDB = new Pool(config);


module.exports = connDB;
```

3. routes (Plantilla):
Se debe cambiar la entidad correspondiente.

```js
const express = require('express');

/*
Es necesario reemplazar la palabra ENTIDAD, por su
correspondiente, ejemplo libroController, ...

Una forma rapida de hacerlo es utilizar Ctrl + H,
Ojo despues de reemplazar igual es necesario revisar
si todo quedo bien.
*/

let ENTIDADController = require('../controllers/ENTIDADController')

let ENTIDAD = express.Router();

    ENTIDAD.route('/ENTIDAD')
        .get(ENTIDADController.readAll);

    ENTIDAD.route('/ENTIDAD/:id')
        .get(ENTIDADController.readById);

    ENTIDAD.route('/ENTIDAD')
        .post(ENTIDADController.create);

    ENTIDAD.route('/ENTIDAD/:id')
        .delete(ENTIDADController.delete);

    ENTIDAD.route('/ENTIDAD/:id')
        .put(ENTIDADController.update);

module.exports = ENTIDAD;

```
4. Controller Manual Plantilla.

```js
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

```

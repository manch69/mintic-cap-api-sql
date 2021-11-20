require('dotenv').config() //process.env....
const express = require('express');
const morgan = require('morgan');
const app = express();

// settings
app.set('port', process.env.PORT);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
//Cambiar ENTIDAD, 
//app.use('/api', require('./routes/ENTIDAD'));
app.use('/api', require('./routes/Libro'));
app.use('/api', require('./routes/Author'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
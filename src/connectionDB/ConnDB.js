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
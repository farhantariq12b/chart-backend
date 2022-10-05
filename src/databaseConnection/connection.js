const mysql = require('mysql');
const connection = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: '',
  database: 'manta_db',
  port: '3306'
  
});

module.exports = connection;


require('dotenv').config();
const port = process.env.PORT;
const app = require('./routes');
const mysql = require('mysql');
const connection = require('./databaseConnection');

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected...')
  }
});

app.listen(port, () => {
  console.log(`Server Starting at http://localhost:${port}`);
});

process.on('uncaughtException', (err) => {

  console.log('Uncaught Exception thrown', err.stack);

});

process.on('unhandledRejection', (reason, p) => {

  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);

});
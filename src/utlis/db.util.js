const connection = require('../databaseConnection');

function resolveDBquery(queryString) {
  
  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  })
}

module.exports = {
  resolveDBquery
}
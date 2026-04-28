const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'testing',
});

let connectPromise;

function connectDb() {
  if (!connectPromise) {
    connectPromise = new Promise((resolve, reject) => {
      db.connect((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(db);
      });
    });
  }

  return connectPromise;
}

if (require.main === module) {
  connectDb()
    .then(() => {
      console.log('Database connection established successfully.');
      db.end();
    })
    .catch((error) => {
      console.error('Database connection failed.');
      console.error(error.message);
      process.exitCode = 1;
    });
}

module.exports = { db, connectDb };

const mysql = require("mysql");

function database(req, res, next) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testing",
  });

  connection.connect((error) => {
    if (error) {
      return next(error);
    }

    res.locals.connection = connection;
    res.on("finish", () => {
      connection.end();
    });
    next();
  });
}

module.exports = database;

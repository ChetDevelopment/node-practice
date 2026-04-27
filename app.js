const express = require("express");
const database = require("./database");
const users = require("./users");

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(database);
app.use("/users", users);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    status: 500,
    error: error.message,
    response: null,
  });
});

module.exports = app;

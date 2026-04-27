const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.locals.connection.query(
    "SELECT * FROM users ORDER BY id ASC",
    (error, results) => {
      if (error) {
        return next(error);
      }

      res.json(results);
    }
  );
});

router.post("/", (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  res.locals.connection.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "email already exists" });
        }

        return next(error);
      }

      res.status(201).json({
        id: results.insertId,
        name,
        email,
      });
    }
  );
});

router.put("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "invalid user id" });
  }

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  res.locals.connection.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
    (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "email already exists" });
        }

        return next(error);
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id,
        name,
        email,
      });
    }
  );
});

router.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "invalid user id" });
  }

  res.locals.connection.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        return next(error);
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    }
  );
});

module.exports = router;

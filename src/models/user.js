import db from "../config/db.js";

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAll() {
        const [rows] = await db.query("SELECT * FROM users");
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0] || null;
    }

    static async create(name) {
        const [result] = await db.query(
          "INSERT INTO users (name) VALUES (?)",
          [name]
        );
        return { id: result.insertId, name };
    }

    static async update(id, name) {
        const [result] = await db.query(
          "UPDATE users SET name = ? WHERE id = ?",
          [name, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, name };
    }

    static async delete(id) {
        const [result] = await db.query(
          "DELETE FROM users WHERE id = ?",
          [id]
        );
        return result.affectedRows > 0;
    }
}

export default User;
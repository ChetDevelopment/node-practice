const { db, connectDb } = require('../config/db');

class UserModel {
  static async getAllUsers() {
    await connectDb();

    const query = 'SELECT * FROM users';

    return new Promise((resolve, reject) => {
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }



  static async createUser(userData) {
    await connectDb();

    const query = 'INSERT INTO users (name, email) VALUES(?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [userData.name, userData.email], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }

  static async updateUser(userId, userData) {
    await connectDb();

    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [userData.name, userData.email, userId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }

  static async deleteUser(userId) {
    await connectDb();

    const query = 'DELETE FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }
}
module.exports = UserModel;

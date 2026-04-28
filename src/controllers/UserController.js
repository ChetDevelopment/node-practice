const UserModel = require('../models/UserModel');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async createUser(req, res) {
        try {
            const userData = req.body;
            const result = await UserModel.createUser(userData);
            res.status(201).json({
                message: 'User created', userId: result.insertId
            });
        }
        catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }


    }

        static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            await UserModel.updateUser(userId, userData);
            res.json({ message: 'User updated' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await UserModel.deleteUser(userId);
            res.json({ message: 'User deleted' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
module.exports = UserController;

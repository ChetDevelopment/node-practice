import User from "../models/User.js";
export class userController extends BaseController {
  // GET ALL users
  usersList = async (req, res) => {
    try {
      const users = await userController.getAll();
      this.success(res, "Users retrieved successfully", users);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // CREATE user
  createUser = async (res, req) => {
    const name = req.body.name;
    try{
      const user = await user.create(name);
      this.success(res, "User created successfully", user, 201);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // UPDATE user
  updateUser = async (res, req) => {
    const id = req.params.id;
    const name = req.body.name;
    try{
      const user = await user.update(id, name);
      this.success(res, "User updated successfully", user);
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  // DELETE user
  deleteUser = async (res, req) => {
    const id = req.params.id;
    try{
      await user.delete(id);
      this.success(res, "User deleted successfully");
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

}
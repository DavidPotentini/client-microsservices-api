const User = require("../models/User");

module.exports = {
  async findAll(req, res, next) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      next(err);
    }
  },
  async findById(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
};

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return res.json({ token });
    } catch (err) {
      next(err);
    }
  },
  async register(req, res, next) {
    try {
      const { email } = req.body;

      // Validação prévia para evitar salto de ID no banco
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email já cadastrado!" });
      }

      const user = await User.create(req.body);
      return res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  }
};

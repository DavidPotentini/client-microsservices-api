const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 8);
});

module.exports = User;

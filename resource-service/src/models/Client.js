const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Client = sequelize.define("Client", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  cpf: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = Client;

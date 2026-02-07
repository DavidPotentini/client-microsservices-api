const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  }
);

async function initDatabase() {
  let attempts = 0;
  while (attempts < 10) {
    try {
      await sequelize.authenticate();
      
      await sequelize.sync({ alter: true });
      console.log("✅ Banco de dados sincronizado.");
      return;
    } catch (err) {
      attempts++;
      console.log(`⏳ Aguardando banco (tentativa ${attempts}/10)...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  throw new Error("Não foi possível conectar ao banco de dados.");
}

module.exports = { sequelize, initDatabase };

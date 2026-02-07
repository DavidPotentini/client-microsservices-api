require("dotenv").config();
const app = require("./app");
const { initDatabase } = require("./database");
require("./models/User");

async function start() {
  try {
    await initDatabase();
    app.listen(3001, () => console.log("🔐 Auth Service [3001]"));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
start();

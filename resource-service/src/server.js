require("dotenv").config();
const app = require("./app");
const { initDatabase } = require("./database");
require("./models/Client");

async function start() {
  try {
    await initDatabase();
    app.listen(3003, () => console.log("📦 Resource Service [3003]"));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
start();

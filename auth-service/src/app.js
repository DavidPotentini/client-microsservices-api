const express = require("express");
const authController = require("./controllers/authController");
const app = express();
const errorHandler = require("./middleware");
app.use(express.json());

app.post("/auth/login", authController.login);
app.post("/auth/register", authController.register);

app.use(errorHandler);

module.exports = app;

//teste workflow
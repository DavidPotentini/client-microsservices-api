const express = require("express");
const userController = require("./controllers/userController");
const app = express();
const errorHandler = require("./middleware");
app.get('/', (req, res) => {
  res.status(200).send('OK');
});
app.use(express.json());

app.get("/users", userController.findAll);
app.get("/users/:id", userController.findById);

app.use(errorHandler);

module.exports = app;

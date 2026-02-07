const express = require("express");
const clientController = require("./controllers/clientController");
const app = express();
const errorHandler = require("./middleware");
app.use(express.json());

app.post("/clients", clientController.create);
app.get("/clients", clientController.findAll);
app.get("/clients/:id", clientController.findById);
app.put("/clients/:id", clientController.update);
app.delete("/clients/:id", clientController.delete);

app.use(errorHandler);

module.exports = app;

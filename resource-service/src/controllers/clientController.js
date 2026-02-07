const Client = require("../models/Client");

module.exports = {
  async create(req, res, next) {
    try {
      const { cpf, email } = req.body;
      
      const existingClient = await Client.findOne({ 
        where: { 
          [require('sequelize').Op.or]: [{ cpf }, { email }] 
        } 
      });

      if (existingClient) {
        return res.status(400).json({ 
          error: "Cliente já cadastrado", 
          details: existingClient.cpf === cpf ? "CPF já existe" : "Email já existe" 
        });
      }

      const client = await Client.create(req.body);
      return res.status(201).json(client);
    } catch (err) {
      next(err);
    }
  },
  async findAll(req, res, next) {
    try {
      const clients = await Client.findAll();
      return res.json(clients);
    } catch (err) {
      next(err);
    }
  },
  async findById(req, res, next) {
    try {
      const client = await Client.findByPk(req.params.id);
      if (!client) return res.status(404).json({ error: "Not found" });
      return res.json(client);
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      const client = await Client.findByPk(req.params.id);
      if (!client) return res.status(404).json({ error: "Not found" });
      await client.update(req.body);
      return res.json(client);
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    try {
      const client = await Client.findByPk(req.params.id);
      if (!client) return res.status(404).json({ error: "Not found" });
      await client.destroy();
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

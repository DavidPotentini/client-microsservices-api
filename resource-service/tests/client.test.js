const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/models/Client", () => ({
  create: jest.fn().mockResolvedValue({ id: 1, name: "Client Test", email: "client@test.com", cpf: "123" }),
  findAll: jest.fn().mockResolvedValue([{ id: 1, name: "Client Test" }]),
  findByPk: jest.fn().mockResolvedValue({ 
    id: 1, 
    name: "Client Test",
    update: jest.fn().mockResolvedValue(true),
    destroy: jest.fn().mockResolvedValue(true)
  }),
  findOne: jest.fn().mockResolvedValue(null)
}));

describe("Resource Service (Clients)", () => {
  it("should create a client", async () => {
    const res = await request(app)
      .post("/clients")
      .send({ name: "Client Test", email: "client@test.com", cpf: "123" });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe("Client Test");
  });

  it("should list all clients", async () => {
    const res = await request(app).get("/clients");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

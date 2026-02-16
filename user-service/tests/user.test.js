const request = require("supertest");
const app = require("../src/app"); 
const User = require("../src/models/User"); 

jest.mock("../src/models/User");

describe("User Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of users", async () => {
    User.findAll = jest.fn().mockResolvedValue([
      { id: 1, name: "João", email: "joao@exemplo.com" },
      { id: 2, name: "Maria", email: "maria@exemplo.com" }
    ]);

    const res = await request(app).get("/users");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(2);
  });

  it("should return a specific user by id", async () => {
    User.findOne = jest.fn().mockResolvedValue({
      id: 1,
      name: "João",
      email: "joao@exemplo.com"
    });

    const res = await request(app).get("/users/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "joao@exemplo.com");
  });
});
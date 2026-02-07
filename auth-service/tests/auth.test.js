const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");

jest.mock("../src/models/User");

jest.mock("bcryptjs", () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue("hashedpassword"),
}));

describe("Auth Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user", async () => {

    // 👇 usuário não existe ainda
    User.findOne.mockResolvedValue(null);

    User.create.mockResolvedValue({
      id: 1,
      email: "test@test.com"
    });

    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: "test@test.com",
        password: "password123"
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should login a user", async () => {

    process.env.JWT_SECRET = "testsecret";

    // 👇 usuário existe para login
    User.findOne.mockResolvedValue({
      id: 1,
      email: "test@test.com",
      password: "hashedpassword"
    });

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@test.com",
        password: "password123"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

});

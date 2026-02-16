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
      { id: 1, name: "João", email: "joao@exemplo.com" }
    ]);

    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
  });
});

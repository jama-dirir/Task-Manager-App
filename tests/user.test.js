const request = require("supertest");
const User = require("../models/userModel");
const app = require("../app");
const { post } = require("../route/user_route");

const userOne = {
  user_name: "Abdullahi",
  user_email: "abdullahi@example.com",
  user_password: "abdalle1251!",
};

const userTwo = {
  user_name: "hodan",
  user_email: "hodan@example.com",
  user_password: "hodatw616!",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
});

describe("GET--users APIs ", () => {
  test(" Should return users --> Array of users objects", async () => {
    const response = await request(app).get("/list").send().expect(200);

    expect(response.body).toEqual({
      users: expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          user_name: expect.any(String),
          user_email: expect.any(String),
          user_password: expect.any(String),
        }),
      ]),
    });
  });
});

// test("Should not return users list", async () => {
//   await request(app).get("/list").send().expect(400);
// });

describe("POST--new User API,s", () => {
  test("Should signup a new user", async () => {
    const response = await request(app)
      .post("/create")
      .send({
        user_name: "ali",
        user_email: "ali@example.com",
        user_password: "hayatQalbi177!",
      })
      .expect(201);

    //Assertion that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assertion about the response
    expect(response.body.user).toEqual({
      __v: expect.any(Number),
      _id: expect.any(String),
      user_name: expect.any(String),
      createdAt: expect.any(String),
      tokens: expect.any(Array),
      updatedAt: expect.any(String),
      user_email: expect.any(String),
      user_password: expect.any(String),
    });
  });

  test("Should login Existing user", async () => {
    await request(app)
      .post("/login")
      .send({
        user_email: userOne.user_email,
        user_password: userOne.user_password,
      })
      .expect(200);
  });

  test("Should not login NotExisting user", async () => {
    await request(app)
      .post("/login")
      .send({
        user_email: userOne.user_email,
        user_password: "jamal242fw",
      })
      .expect(400);
  });
});

describe("Delete ---users API,s", () => {
  test("Should delete a user", async () => {
    const response = await request(app)
      .delete("/delete/62a471e282a6b52d957129c1")
      .send()
      .expect(200);
  });
});

// describe("UPDATE ---users API,s", () => {
//   test("Should delete a user", async () => {
//     const response = await request(app)
//       .put("/update/62a41e0cba73b6c2a5684b75")
//       .send({ user_email: "hodnina@gmail.com" })
//       .expect(200);
//   });
// });

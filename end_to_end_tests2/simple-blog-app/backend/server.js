const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const create = require("./controller/createUser");
const find = require("./controller/findUser");
const findAll = require("./controller/getAllUsers");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/users", async (req, response) => {
  const users = await findAll();

  if (users) {
    console.log(typeof users);
    response.json(users);
  }
});

// The /seed api is to clear the database while testing on cypress
// app.get("/seed", (req, res) => {
//   users = [];
//   res.status(201).send("Done");
// });

app.post("/users", async (req, res) => {
  const user = await find(req.body.email);
  if (user) {
    res.status(400).send({ message: "User already exists" });
    res.end();
  } else {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      };

      create(user).catch(console.error);
      res.status(201).send({
        success: "User created successfully",
        email: req.body.email,
      });
      res.end();
    } catch (err) {
      console.log(err);
    }
  }
});

app.post("/users/login", async (req, res) => {
  const data = req && JSON.stringify(req.body) != "{}" && req.body;
  if (data) {
    const user = await find(data.email);
    if (user) {
      try {
        if (await bcrypt.compare(data.password, user.password)) {
          return res.status(201).send({ message: "You are logged in" });
        } else {
          return res.status(401).send({ message: "User is not allowed" });
        }
      } catch {
        res.status(500).send({ error: "An error has occurred" });
      }
    } else {
      return res.status(400).send({ error: "Cannot find user" });
    }
  }
});
app.listen(3000);
console.log("Server listening on port 3000");

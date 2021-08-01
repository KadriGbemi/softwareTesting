const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
const bcrypt = require("bcrypt");
let users = [];
app.get("/users", (req, response) => {
  response.json(users);
});

app.get("/seed", (req, res) => {
  users = [];
  res.status(201).send("Done");
});
app.post("/users", async (req, res) => {
  const user = users.find((user) => user.email == req.body.email);
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
      users.push(user);
      res.status(201).send({
        success: "User created successfully",
        email: req.body.email,
        password: req.body.password
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
    const user = users.find((user) => user.email == data.email);
    if (user == null) {
      return res.status(400).send({ error: "Cannot find user" });
    }

    try {
      if (await bcrypt.compare(data.password, user.password)) {
        return res.status(201).send({ message: "You are logged in" });
      } else {
        return res.status(401).send({ message: "User is not allowed" });
      }
    } catch {
      res.status(500).send({ error: "An error has occurred" });
    }
  }
});
app.listen(3000);
console.log("Server listening on port 3000");

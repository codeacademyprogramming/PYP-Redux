const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

// ROUTES
app.use(cors());
app.use(bodyParser.json());

function idGenerator() {
  return Math.floor(Math.random() * 1000000 + 1);
}

// ADD USER
app.post("/api/users/new", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("db/users.json"));
    let newUser = req.body;
    newUser.id = idGenerator();
    data.push(newUser);
    fs.writeFileSync("db/users.json", JSON.stringify(data));
    setTimeout(() => res.status(200).send({ id: newUser.id }), 3000);
  } catch (error) {
    res.status(500).send({ code: "could-not-add-user" });
  }
});

// GET ALL USERS
app.get("/api/users", (_, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("db/users.json"));
    setTimeout(() => res.status(200).send(data), 3000);
  } catch (error) {
    res.sendStatus(500);
  }
});

// GET A USER BY ID
app.get("/api/users/:id", (req, res) => {
  try {
    const allUsers = JSON.parse(fs.readFileSync("db/users.json"));
    const userById = allUsers.find((user) => user.id == req.params.id);
    if (userById) {
      res.json(userById);
    } else {
      res.status(404).send({ code: "not-found" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

// EDIT USERS DATA
app.post("/api/users/edit/:id", (req, res) => {
  try {
    const allUsers = JSON.parse(fs.readFileSync("db/users.json"));
    const newUserData = req.body;

    allUsers.map((user) => {
      if (user.id == req.params.id) {
        user.name = newUserData.name;
        user.surname = newUserData.surname;
        user.age = newUserData.age;
        user.mail = newUserData.mail;
        user.gender = newUserData.gender;
        user.imgUrl = newUserData.imgUrl;
      }
      return user;
    });
    fs.writeFileSync("db/users.json", JSON.stringify(allUsers));
    setTimeout(() => res.status(200).send({ id: newUserData.id }), 3000);
  } catch (error) {
    res.sendStatus(500);
  }
});

// DELETE A USER
app.delete("/api/users/delete/:id", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("db/users.json"));
    const result = data.find((book) => book.id == req.params.id);
    if (Boolean(result)) {
      const newList = data.filter((book) => book.id != req.params.id);
      fs.writeFileSync("db/users.json", JSON.stringify(newList));
      setTimeout(() => res.sendStatus(200), 3000);
    } else {
      res.status(404).send({ code: "no-user-found" });
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen("3005");

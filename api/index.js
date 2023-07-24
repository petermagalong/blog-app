const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://tian123:tian123@cashless.eybps.mongodb.net/?retryWrites=true&w=majority"
);

const salt = bcrypt.genSaltSync(10);
const secret = "asdarwqdasdgadsasgas";

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const isUniqueUser = await User.count({ username });
  if (isUniqueUser > 0) {
    return res.status(400).json("user already exist");
  }
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json("already exist");
    }
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(404).json("user not exist");
  }
  const passOK = bcrypt.compareSync(password, userDoc.password);
  if (passOK) {
    //login
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credential");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  //   res.json(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("okay");
});
app.listen(4000);
//mongodb+srv://tian:tian@cashless.eybps.mongodb.net/

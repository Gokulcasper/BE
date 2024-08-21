const express = require("express");
const users = require("../modal/User");

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const email = req.body.email;
    const number = req.body.number;
    const findEmail = await users.findOne({ email: email });
    const findNumber = await users.findOne({ number: number });

    if (findEmail) {
      return res.status(402).json({ message: "Email already registered ..." });
    }

    if (findNumber) {
      return res.status(402).json({ message: "Number already registered ..." });
    }

    const newUser = await users.create({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      password: req.body.password,
    });

    return res.status(200).json({ message: "user created successfully..." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const usersData = await users.find();
    return res.status(200).json(usersData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/users/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const usersData = await users.findOne({_id});
    return res.status(200).json(usersData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.put("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const findEmail = await users.findOne({ email: email });

    if (!findEmail) {
      return res.status(402).json({ message: "Email doesn't exist ..." });
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      password: req.body.password,
    };

    const updateUser = await users.findOneAndUpdate({ email: email }, newUser);
    return res.status(200).json({ message: "user updated successfully..." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/user/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteUser = await users.findOneAndDelete({ _id });
    return res.status(200).json({ message: "user deleted successfully..." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;

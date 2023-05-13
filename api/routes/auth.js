const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ msg: "User Does not Exists!" });
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      user.password = "";
      res.status(200).json({ token, user });
    } else {
      res.status(400).json({ msg: "Wrong Email / Password" });
    }
  } catch (err) {
    res.status(500).json({ msg: "An Error Occured!" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ msg: "User Already Exists!" });
      return;
    }

    const salt = bcrypt.genSaltSync(4);

    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    user.save();

    res.json({ msg: "User Created Successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

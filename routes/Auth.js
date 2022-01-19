const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserData = require("../model/userSchema");
require("../config/database");
const Authenticate = require("../middleware/Authenticate");
const mailHelper = require("../utils/mailHelpers");

// router.get("/", (req, res) => {
//   res.send("hello from simple server :)");
// });

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
      return next(new Error("All fields are mandatory"));
    }

    if (password !== cpassword) {
      return next(new Error("Password and Confirm Password not matching"));
    }

    const userExists = await UserData.findOne({ email: email });

    if (userExists) {
      return next(new Error("Already registered please Login"));
    }

    // const userPhone = await Users.findOne({ phone: phone });
    // if (!userPhone) {
    // 	return next(new Error(": Please provide another contact No "));
    // }

    await UserData.create({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });

    //mail sent
    await mailHelper({
      email: email,
      subject: "Registration At Banking System",
      message: "You've successfully completed Registration at Banking System!",
    });

    res.status(201).json({
      success: true,
      message: "Register successfully",
    });
  } catch (error) {
    return next(new Error(error));
  }
});

// create the user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz Filled the data" });
    }

    //checking email
    const checkUser = await UserData.findOne({ email: email });
    if (!checkUser) {
      res.status(401).json({ message: "Invalid Credentials please register!" });
    }

    //checking password
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      res.status(401).json({ message: "Invalid Credentials!" });
    }

    const token = await checkUser.generateAuthToken();
    console.log(`the token part ${token}`);

    res.status(201).cookie("jwt", token, {
      expires: new Date(Date.now() + 1800000),
      httpOnly: true,
      // secure:true
    });

    //mail sent
    await mailHelper({
      email: email,
      subject: "Login At Banking",
      message: "You've successfully Login at Banking System!",
    });

    res.status(201).send("User Login successFully!");
  } catch (err) {
    console.log(err);
  }
});

//get data
router.get("/getdata", Authenticate, async (req, res, next) => {
  try {
    const userProfile = await UserData.findById(req.user.id);

    userProfile.password = undefined;
    userProfile.cpassword = undefined;

    res.status(201).send({ userProfile });
  } catch (error) {
    return next(new Error(error.message));
  }
});

//transaction page
router.post("/transaction", Authenticate, async (req, res, next) => {
  try {
    // const newData = {
    // 	name: req.body.name,
    // 	email: req.body.email,
    // 	phone: req.body.phone,
    // };

    // await Users.findByIdAndUpdate(req.user.id, newData);
    const userProfile = await UserData.findById(req.user.id);

    userProfile.password = undefined;
    userProfile.cpassword = undefined;

    res.status(201).send({ userProfile });

    const { amount } = req.body;

    const addMsg = await UserData.findByIdAndUpdate(req.user.id, {
      $push: {
        amount: amount,
      },
    });

    if (addMsg) {
      res.status(201).json({
        success: true,
        amount: "User Transaction Successfully",
      });
    } else {
      return res.status(401).json({
        success: true,
        amount: "Transaction not Successfully",
      });
    }
    //mail sent
    await mailHelper({
      email: email,
      subject: "Transaction At Banking",
      message: "You've successfully Transaction at Banking System!",
    });
  } catch (error) {
    console.log(error);
  }
});

// logout page
router.get("/logout", Authenticate, (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(201).send("user logout!");
});

module.exports = router;

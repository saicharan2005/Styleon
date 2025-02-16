const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User =require('../../models/User')

//register route

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password:hashPassword ,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registeration Sucessfull",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (e) {
    console.log(e);
    req.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};



module.exports ={registerUser}
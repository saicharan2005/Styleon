const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register route

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User alredy exists with some email Please try with another",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
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

//login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    console.log(checkUser);

    if (!checkUser)
      return res.json({
        success: false,
        message: "User doest not exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password ! Please try Again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username:checkUser.username
      },
      "charan",
      { expiresIn: "200m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).status(200).json({
      success: true,
      message: "logged In successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username:checkUser.username
      },
    });
  } catch (e) {
    console.log(e);
    req.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};


//logout

const logoutUser = (req,res) => {
  res.clearCookie('token').json({
    success: true,
    message: "Logout successfully"
  })
}


//authmiddleware:


const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({
    success: false,
    message: "unauthorised user!",
  });
 //decode the token by passing the secrete key
  try {
    const decoded = jwt.verify(token, 'charan');
    req.user = decoded;
    next()
  } catch (error) {
    
  }
}

module.exports = { registerUser ,loginUser,logoutUser,authMiddleware};

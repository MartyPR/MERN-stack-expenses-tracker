const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

//!user Registration

const userController = {
  //!register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    //!validate
    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }
    //! check is user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already Exists");
    }
    //! hash the user Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //!Create a the user and save into db
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    //!send the response
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),
  //!login
  login: asyncHandler(async (req, res) => {
    //!get user Data
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      throw new Error("invalid login credentials");
    }
    //!compare password
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      throw new Error("invalid login credentials");
    }
    //! generate a token
    const token = jwt.sign({ id: userFound._id }, "ExpensesKey", {
      expiresIn: "30d",
    });
    //send the response
    res.json({
      message: "Login Success",
      token,
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
    });
  }),
  //!Profile
  profile: asyncHandler(async (req, res) => {
    //! find the user with token in isAuth
    // console.log(req.headers);
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //! send the response
    res.json({
      username: user.username,
      email: user.email,
    });
  }),


  //todo Update Password o change___________________________________________________________
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    //!find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("user not found");
    }
    //!Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    //!reSave
    await user.save();
    //!send response
    res.json({ message: "Password changed successfully" });
  }),
  updateUserProfile: asyncHandler(async (req, res) => {
    //!find the user
    const { email, username } = req.body;
    const uptadeUser = await User.findByIdAndUpdate(req.user, {
      username,
      email,
    },{
        new:true
    });
    res.json({message:"User profile update successfully"})
  }),
};
module.exports = userController;

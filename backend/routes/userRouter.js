const express = require("express");
const userController = require("../controllers/usersCtrl");
const isAuth = require("../middlewares/isAuth");
const userRouter = express.Router();

//!register
userRouter.post("/api/v1/user/register", userController.register);
//!login
userRouter.post("/api/v1/user/login", userController.login);
//!profile
userRouter.get("/api/v1/user/profile", isAuth, userController.profile);

//!update passworrd
userRouter.put(
  "/api/v1/user/change-password",
  isAuth,
  userController.changeUserPassword
);

//!update user Profile
userRouter.put(
  "/api/v1/user/update-profile",
  isAuth,
  userController.updateUserProfile
);

module.exports = userRouter;

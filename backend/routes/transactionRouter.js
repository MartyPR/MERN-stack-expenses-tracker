const express = require("express");
const transactionController = require('../controllers/transactionCtrl')
const isAuth = require("../middlewares/isAuth");
const transactionRouter = express.Router();

//!add
transactionRouter.post("/api/v1/transactions/create",isAuth, transactionController.create);
//!lists
transactionRouter.get("/api/v1/transactions/lists", isAuth, transactionController.getFilteredTransactions);
//!profile
// userRouter.get("/api/v1/user/profile", isAuth, userController.profile);

// //!update passworrd
transactionRouter.put(
  "/api/v1/transactions/update/:id", //in  postman add id http://localhost:8000/api/v1/transactions/update/6675ec8c43fb54a899f32eb7
  isAuth,
  transactionController.update
);

// //!remove user Profile
transactionRouter.put(
  "/api/v1/transactions/delete/:id",
  isAuth,
  transactionController.delete
);

module.exports = transactionRouter;

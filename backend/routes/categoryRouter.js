const express = require("express");
const categoryController = require('../controllers/categoryCtrl')
const isAuth = require("../middlewares/isAuth");
const CategoryRouter = express.Router();

//!add
CategoryRouter.post("/api/v1/categories/create",isAuth, categoryController.create);
//!lists
CategoryRouter.get("/api/v1/categories/lists", isAuth, categoryController.lists);


//!update 
CategoryRouter.put(
  "/api/v1/categories/update/:id",
  isAuth,
  categoryController.update
);

//!delete   
CategoryRouter.delete(
  "/api/v1/categories/delete/:id",
  isAuth,
  categoryController.delete
);

module.exports = CategoryRouter;

const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

//!Cateogry Registration

const categoryController = {
  //!add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and type are required for creating a category");
    }
    //convert the nae to lowercase
    const normalizedName = name.toLowerCase();
    //! check if the type is valid
    const valudTypes = ["income", "expense"];

    if (!valudTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type" + type);
    }
    //!check if categoru already exist on the user acount
    const categoryExist = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });
    if (categoryExist) {
      throw new Error(
        `Cateogry ${categoryExist.name} already exists in the database`
      );
    }
    //!create a category
    const createCategory = await Category.create({
      name: normalizedName,
      user: req.user,
      type,
    });
    res.status(201).json(createCategory);
  }),



  //!lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),


  //!update
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const { type, name } = req.body;

    // normalizedname
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);
    if (!category && category.user.toString() === req.user.toString()) {
      throw new Error("Category not found or user not authorized");
    }
    const oldName = category.name;
    //!update category properties
    category.name = normalizedName;
    category.type = type;
    const updatedCategory = await category.save();
    //update affected transaction
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        {
          $set: { category: updatedCategory.name },
        }
      );
    }
    res.json(updatedCategory);
  }),


  //!delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
 
    if (category && category.user.toString() === req.user.toString()) {
      //! update transaction that have this category
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {
          user: req.user,
          category: category.name,
        },
        {
          $set: { category: defaultCategory },
        }
      );

      //remove Category
      await Category.findByIdAndDelete(req.params.id);
      res.json({message:'Category Deleted and transaction updated'});
    }else{
      res.json({message:"Category not found or user not authorized"});
    
    }
  }),
};
module.exports = categoryController;

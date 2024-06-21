const asyncHandler = require("express-async-handler");
const Transaction = require('../model/Transaction')
//!Cateogry Registration

const TransactionController = {
  //!add
  create: asyncHandler(async (req, res) => {
    const {  type, category,amount,date,description } = req.body;
    if (!amount || !type || !date) {
      throw new Error("Type, amount and date are required ");
    }

    //!create
    const transaction = await Transaction.create({
      user:req.user,
      type,
      category,
      amount,
      date,
      description
    })

    res.status(200).json(transaction);
   
  }),


  //!lists
  getFilteredTransactions: asyncHandler(async (req, res) => {

    const {startDate,endDate,type,category}= req.query;
    console.log(req.query);
    let filter={user:req.user}
   
    if (startDate) {
      filter.date={...filter,$get: new Date(startDate)}
    }
    if (endDate) {
      filter.date={...filter,$get: new Date(startDate)}
    }
    if (startDate) {
      filter.date={...filter,$lte: new Date(endDate)}
    }
    if(type){
      filter.type=type
    }
    if (category) {
      if (category==='All') {
        //!no cateogry filter needed when filterin for all       
      }else if (category==='Uncategorized') {
        //!filter for transaciotn
        filter.category="Uncategorized"
      }else{
        filter.category=category
      }
    }
    const transactions= await Transaction.find(filter).sort({date:-1})
    res.json(transactions)
  }),
  //!update
  update: asyncHandler(async (req, res) => {

    const transaction = await Transaction.findById(req.params.id)
    if (transaction && transaction.user.toString()===req.user.toString()) {
       transaction.type = req.body.type || transaction.type;
       transaction.category= req.body.category || transaction.category;
       transaction.amount= req.body.amount || transaction.amount;
       transaction.date= req.body.date || transaction.date;
       transaction.description= req.body.description || transaction.description;
       const updateTransaction = await  transaction.save();
       res.json(updateTransaction)
    }
  }),
  //!delete
  delete: asyncHandler(async (req, res) => {
     //find by id
     
    const transaction = await Transaction.findById(req.params.id)
    if (transaction && transaction.user.toString()===req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id)
      res.json({message:"Transaction Removed"})
   }

  }),
};
module.exports = TransactionController;

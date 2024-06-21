const express = require("express");

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const { mongoose } = require("mongoose");
const errorHandler = require("./middlewares/ErrorHandlerMiddleware");

const app = express();

//!Connnect to mongo db
mongoose
  .connect("mongodb+srv://martypr3:D1xThbsAA8je1C1x@mongodbinit-cluster.ngp65be.mongodb.net/?retryWrites=true&w=majority&appName=MongoDBinit-cluster")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => console.log(e));

  //!middlewares
  app.use(express.json());//?pass incoming json data
  

//!Routes
app.use("/", userRouter);
app.use("/",categoryRouter )
app.use("/",transactionRouter)
//!Error Handler
app.use(errorHandler)

//!start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(PORT, `Server is running on this port ${PORT}`)
);

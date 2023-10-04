const express = require("express");
const app = express();
const taskRouter = require("./routes/tasks");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const connectDB = require("./DB/connect");
require("dotenv").config();

const PORT = process.env.PORT || 3020;

// Middlewares //
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", taskRouter);
app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.DB);
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log("Something happened while connecting ", err);
  }
};
start();

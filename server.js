const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const connection = require("./db/db");
const UserRouter = require("./routes/user.routes");
const TaskRouter = require("./routes/task.routes");
// const dotenv = require("dotenv");
app.use(cors());
app.use("/users", UserRouter);
//userrouter
app.use("/task", TaskRouter);

app.listen(2000, async () => {
  try {
    await connection; //i kept connection here
    console.log("server started");
  } catch (error) {
    console.log("error");
  }
});
//starting the server

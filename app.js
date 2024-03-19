const mongoose=require("mongoose");
const connectToDatabase=require("./db");
require("dotenv").config()
const bodyparser=require("body-parser")
const dairyRoutes= require("./routes/dairyRoutes");
const userRoutes=require("./routes/userRoutes");

const express=require("express");
const app=express();
app.use(bodyparser.json());
app.use(userRoutes);
app.use(dairyRoutes);
//connnecting to the database
connectToDatabase();
//starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


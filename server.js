const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require("body-parser");
const passport = require("passport");
const users = require("./routers/api/users");
const profile = require("./routers/api/profiles");

const db = require("./config/keys").mongoURI;

const app = express();

//connect to mongodb
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
  console.log("Mongodb connect");
}).catch((err) =>{
  console.log(err);
})

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/",(req,res)=>{
  res.send("Hello world!");
})

//使用router
app.use("/api/users",users);
app.use("/api/profile",profile);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server running on port ${port}`);
})
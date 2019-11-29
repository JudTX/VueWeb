// login & register
const express = require('express');
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../../models/User");
const keys = require("../../config/keys");
const passport = require("passport");

//使用get请求 访问api/users/test 
//返回请求的json数据
//access public 公开接口
router.get("/test",(req,res) =>{
  res.json({msg:"login works"});
})

//使用POST请求 访问api/users/register
//返回请求的json数据
//access public 公开接口
router.post("/register",(req,res) =>{
  // console.log(req.body);
  //查询数据库中是否拥有req.body内容是否存在
  User.findOne({email:req.body.email})
      .then(user =>{
        if(user){
          return res.status(400).json("邮箱已被注册");
        }else{
          const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
          const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            avatar,
            password:req.body.password,
            password2: req.body.password2,
            identity:req.body.identity
          })

        //密码加密(使用bcrypt)
          if(newUser.password == newUser.password2){
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(newUser.password, salt, function(err, hash) {
                  if(err) throw err;
                  newUser.password = hash;
                  newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
          }else{
            return res.status(400).json("两次输入的密码不一致!")
          }
        }
      })
})

//route 使用POST请求 访问api/users/login
//desc 返回 token jwt passport
//access public 公开接口
router.post("/login",(req,res) =>{
  const email = req.body.email;
  const password = req.body.password;
  //查询数据库
  User.findOne({email})
      .then(user =>{
        if(!user){
          return res.status(404).json("用户不存在");
        }

        //判断密码
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if(isMatch){
                  const rule = {
                    id:user.id,
                    name:user.name,
                    avatar: user.avatar,
                    identity: user.identity
                  };
                  jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                    if(err) throw err;
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    })
                  })
                  // res.json({msg:"success"});
                }else{
                  return res.status(400).json("密码错误!")
                }
              })
      })
})

//route 使用POST请求 访问api/users/current
//desc 返回 token jwt passport
//access public 公开接口
router.get("/current",passport.authenticate('jwt',{session:false}),(req,res)=>{
  res.json({
    id: req.user.id,
    user: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  });
})

module.exports = router;
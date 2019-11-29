<template>
  <div class="login">
      <section class="form_container">
          <div class="manage_tip">
              <span class="title">在线后台管理系统</span>
              <el-form :model="login" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="login.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="login.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="margin-right: 45px;" class="btn_from" @click="submitForm('loginForm')">登陆</el-button>
                  <el-button @click="resetForm('loginFrom')">重置</el-button>
                </el-form-item>
                <div class="tiparea">
                  <p>还没有账号?现在<router-link to='/register'>注册</router-link></p>
                </div>
              </el-form>
          </div>
      </section>
  </div>
</template>

<script>
  import jwt_decode from 'jwt-decode';
  export default {
    name: "login",
    data(){
      return {
        login:{
          email: '',
          password: ''
        },
        rules:{
          email: [{
            type: "email",
            required: true,
            message: "请填入有效的邮箱",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }]
        }
      }
    },
    methods:{
      submitForm(fromName){
        this.$refs[fromName].validate(valid =>{
          if(valid){
            this.$axios.post("/api/users/login",this.login)
            .then(res => {
              // console.log(res);
              const {token} = res.data;
              //存储到localStorage
              localStorage.setItem('Token',token);
              //解析token
              const decode = jwt_decode(token);
              // console.log(decode);
              //把解析后的token存入vuex
              this.$store.dispatch("setEmpower",!this.isEmpty(decode));
              this.$store.dispatch("setUser",decode);

              this.$router.push('/index');
            })
          }
        })
      },
       resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      isEmpty(value){
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        )
      }
    }
  }
</script>

<style>
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/background.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .form_container {
    width: 370px;
    height: 210px;
    position: absolute;
    top: 25%;
    left: 37%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
  }
  .form_container .manage_tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }
  .loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
  }
  .tiparea p{
    font-size: 12px;
    text-align: right;
  }
  .tiparea p a{
    color: #409eff;
  }
</style>
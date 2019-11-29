<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">在线后台管理系统</span>
                <el-form :model="Register" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                  <el-form-item label="用户名" prop="name">
                    <el-input v-model="Register.name" placeholder="请输入用户名"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="Register.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="Register.password" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="Register.password2" placeholder="请重新输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="选择身份" prop="identity">
                    <el-select v-model="Register.identity" placeholder="请选择身份">
                      <el-option label="管理员" value="employer"></el-option>
                      <el-option label="员工" value="employee"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" class="btn_from" @click="submitForm('registerForm')">注册</el-button>
                    <el-button @click="submitBack">返回</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
import { type } from 'os';
export default {
  name: "register",
  data(){
    let checkpw = (rule, value, callback) =>{
      if(value !== this.Register.password){
        callback(new Error('两次输入密码不一致'));
      }else{
        callback();
      }
    }
    return{
      Register:{
        name: '',
        email: '',
        password: '',
        password2: '',
        identity: ''
      },
      rules: {
        name: [{
          required: true,
          message: "用户名不能为空",
          trigger: "blur"
        },
        {
          min: 2,
          max: 30,
          message: "用户名应在2到30字符之间"
        }],
        email: [{
          type: "email",
          required: true,
          message: "不是有效的邮箱地址",
          trigger: "blur"
        }],
        password: [{
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        },{
          min: 6,
          max: 30,
          message: "长度应在6到30之间",
          trigger: "blur"
        }],
        password2: [{
          required: true,
          validator: checkpw,
          trigger: "blur"
        }]
      }
    }
  },
  methods: {
    submitForm(fromName){
      this.$refs[fromName].validate(valid =>{
        if(valid){
          this.$axios.post("/api/users/register",this.Register)
          .then(res =>{
            //注册成功
            this.$Message({
              message: '账号注册成功',
              type: 'success'
            })
          })
          this.$router.push('/login');
        }
      })
    },
    submitBack(){
      this.$router.push('/login');
    }
  }
};
</script>


<style scoped>
.register {
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
  top: 10%;
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
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.el-button{
  margin-right: 20px;
}
</style>




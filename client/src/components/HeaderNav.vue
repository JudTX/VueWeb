<template>
  <header class="header_nav">
    <el-row>
      <el-col :span='6' class="logo-container">
        <img src="../assets/logo.png" alt="logo" class="logo">
        <span class="title">在线后台管理</span>
      </el-col>
      <el-col :span='6' class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" alt="头像">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="list">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="setInfo">
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
  export default {
    name: "headernav",
    computed:{
      user(){
        return this.$store.getters.user;
      }
    },
    methods:{
      setInfo(cmdItem){
        // console.log(cmdItem);
        switch(cmdItem){
          case "info":
            this.showInfoList();
            break;
          case "logout":
            this.logout();
            break;
        }
      },
      showInfoList(){
        // console.log("个人信息");
        this.$router.push("/info")
      },
      logout(){
        // console.log("退出");
        //清除存在于localStorage里的token
        localStorage.removeItem("Token");
        //清除vuex里的token信息
        this.$store.dispatch("claerCurrentState");
        //跳转登录页面
        this.$router.push("/login");
      }
    }
  }
</script>

<style scoped>
  .header_nav{
    width: 100%;
    height: 80px;
    min-width: 600px;
    padding: 5px;
    background-color: #be3144;
    color: #fff;
    border-bottom: 1px solid #324057;
  }
  .logo-container {
    line-height: 80px;
    min-width: 400px;
  }
  .logo {
    height: 50px;
    width: 50px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    vertical-align: middle;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    letter-spacing: 3px;
  }
  .user {
    line-height: 80px;
    text-align: right;
    float: right;
    padding-right: 30px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }
  .welcome {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
  }
  .name {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .comename {
    font-size: 12px;
  }
  .avatarname {
    color: #cccccc;
    font-weight: bolder;
  }
  .list {
    cursor: pointer;
    margin-right: 5px;
  }
  .el-dropdown {
    color: #fff;
  }
</style>
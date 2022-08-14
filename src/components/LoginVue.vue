<template>
  <div class="login_container">
    <div class="login_logo_container">
      <div class="login_logo">
        <img src="../assets/xmlogo.png" alt="" width="300" height="50">
      </div>
    </div>
    <div class="login_center_logo">
      <img src="../assets/since.png" alt="" width="500" height="500">
    </div>
    <div class="login_box" >
      <div class="login_label">
        会员登录
      </div>
      <el-form :model="loginForm" label-width="80px" class="login_form" :rules="loginRules" ref="loginRef">
        <el-form-item label="用户名" prop="userName">
          <el-input  prefix-icon="el-icon-user" v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input  prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="warning" @click="login">登录</el-button>
        <el-button @click="register">注册</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据绑定
      loginForm: {
        userName: '',
        password: ''
      },
      // 登录表单的验证规则
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录按钮
    login () {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return
        // const { data: res } = await this.$http.post('login', this.loginForm)
        // if (res.meta.status !== 200) return this.$message.error('登录失败！')
        // this.$message.success('登录成功！')
        // 登录成功后token保存到客户端的seesionStorage
        // window.sessionStorage.setItem('token', res.data.token)
        // 导航跳转到后台主页
        this.$router.push('/home')
      })
    },
    // 注册按钮
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style  lang="less" scoped>
.login_logo_container{
  background-color: #fff;
  height: 10%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.login_logo {
  position: absolute;
  left: 1%;
  top: 20%;
}
.login_container{
  background-color: #ca6924;
  height: 90%;
  width: 100%;
}
.login_center_logo{
  position: absolute;
  left: 40%;
  top: 46%;
  transform: translate(-50%,-50%);
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px ;
  position: absolute;
  left: 75%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.login_label{
  color: #E6A23C;
  font-weight:bold;
  font-size: larger;
  position: absolute;
  top: 15%;
  width: 100%;
}
.login_form{
  position: absolute;
  top: 30%;
  width: 80%;
  box-sizing: border-box;
}
</style>

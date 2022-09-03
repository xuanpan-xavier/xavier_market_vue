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
        <el-form-item label="电话" prop="Telephone">
          <el-input  prefix-icon="el-icon-phone" v-model="loginForm.Telephone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input  prefix-icon="el-icon-lock" v-model="loginForm.Password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" label="会员" >会员</el-radio>
          <el-radio v-model="radio" label="管理员">管理员</el-radio>
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
import { mapActions } from 'vuex'
import Vue from 'vue'
export default {
  data () {
    return {
      radio: '会员',
      // 登录表单的数据绑定
      loginForm: {
        Telephone: '',
        Password: ''
      },
      // 登录表单的验证规则
      loginRules: {
        Telephone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '电话号码正确长度为 11 个字符', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('userModule', { userLogin: 'login' }),
    // 登录按钮
    login () {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return
        this.userLogin(this.loginForm).then(() => {
          if (this.radio === '会员') this.$router.push('/UserHome')
          else this.$router.push('/ManagementHome')
          Vue.prototype.$message.success('登录成功！')
        }).catch((err) => {
          Vue.prototype.$message.error('登录失败！')
          console.log(err)
        })
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
  height: 380px;
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

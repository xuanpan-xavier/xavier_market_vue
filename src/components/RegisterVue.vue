<template>
  <div class="register_container">
    <div class="register_logo_container">
      <div class="register_logo">
        <img src="../assets/xmlogo.png" alt="" width="300" height="50">
      </div>
    </div>
    <div class="register_center_logo">
      <img src="../assets/since.png" alt="" width="500" height="500">
    </div>
    <div class="register_box" >
      <div class="register_label">
        会员注册
      </div>
      <el-form :model="registerForm" label-width="80px" class="register_form" :rules="registerRules" ref="registerRef">
        <el-form-item label="用户名" prop="Name">
          <el-input  prefix-icon="el-icon-user" v-model="registerForm.Name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="Telephone">
          <el-input  prefix-icon="el-icon-phone" v-model="registerForm.Telephone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input  prefix-icon="el-icon-lock" v-model="registerForm.Password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="register">注册</el-button>
          <el-button @click="login">返回</el-button>
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
      // 注册表单的数据绑定
      registerForm: {
        Name: '',
        Telephone: '',
        Password: ''
      },
      // 登录表单的验证规则
      registerRules: {
        Name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
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
    ...mapActions('userModule', { userRegister: 'register' }),
    // 注册按钮
    register () {
      this.$refs.registerRef.validate(async valid => {
        if (!valid) return
        this.userRegister(this.registerForm).then(async () => {
        // userService.register(this.registerForm).then((res) => {
          // 登录成功后token保存到缓存
          // storageService.set(storageService.USER_TOKEN, res.data.token)
          // this.SET_TOKEN(res.data.data.token)
          // this.$store.commit('userModule/SET_TOKEN', res.data.data.token)
          // 导航跳转到后台主页
          // return userService.info()
          await this.$router.push('/UserHome')
          Vue.prototype.$message.success('注册成功！')
        })// .then(async (response) => {
          // 保存用户信息
          // this.SET_USERINFO(response.data.data.user)
          // this.$store.commit('userModule/SET_USERINFO', response.data.data.user)
          // storageService.set(storageService.USER_INFO, JSON.stringify(response.data.data.user))// 序列化 取出时需要反序列化JSON.parse(
          .catch((err) => {
            Vue.prototype.$message.error('注册失败！')
            console.log(err)
          })
      })
    },
    // 注册按钮
    login () {
      this.$router.push('/login')
    }
  }
}
</script>

<style  lang="less" scoped>
.register_logo_container{
  background-color: #fff;
  height: 10%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.register_logo {
  position: absolute;
  left: 1%;
  top: 20%;
}
.register_container{
  background-color: #ca6924;
  height: 90%;
  width: 100%;
}
.register_center_logo{
  position: absolute;
  left: 40%;
  top: 46%;
  transform: translate(-50%,-50%);
}
.register_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px ;
  position: absolute;
  left: 75%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.register_label{
  color: #E6A23C;
  font-weight:bold;
  font-size: larger;
  position: absolute;
  top: 6%;
  width: 100%;
}
.register_form{
  position: absolute;
  top: 20%;
  width: 90%;
  box-sizing: border-box;
}
</style>

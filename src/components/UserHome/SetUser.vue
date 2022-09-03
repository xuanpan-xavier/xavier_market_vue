<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/UserHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      <el-breadcrumb-item>信息修改</el-breadcrumb-item>
    </el-breadcrumb>
  <el-card>
    <!-- 按钮搜索/添加区域 -->
    <el-row :gutter="20">
      <el-col :span="2" :offset="20">
        <el-button type="warning" @click="SetUserInfo" class="save_button">保存</el-button>
      </el-col>
      <el-col :span="2" >
        <el-button type="" @click="getUserInfo" class="clear_button">重置</el-button>
      </el-col>
    </el-row>
    <el-row>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="4">
        <el-form :model="editForm" :rules="editRules" ref="editRef" label-width="70px">
          <el-form-item label="用户名" prop="Name" >
            <el-input v-model="editForm.Name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="Telephone">
            <el-input v-model="editForm.Telephone" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="Password">
            <el-input v-model="editForm.Password"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SetUser',
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo
  }),
  data () {
    return {
      editForm: {
        Name: '',
        Telephone: '',
        Password: ''
      },
      editRules: {
        Name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        Password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const { data: res } = await this.$http.get('VIP/' + this.userInfo.Telephone)
      if (res.code !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm.Name = res.data.VIP.Name
      this.editForm.Telephone = res.data.VIP.Telephone
      this.editForm.Password = ''
    },
    SetUserInfo () {
      this.$refs.editRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('VIP/' + this.editForm.Telephone, this.editForm)
        if (res.code !== 200) {
          return this.$message.error('修改用户信息失败！')
        }
        this.$message.success('修改用户信息成功!')
        await this.getUserInfo()
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

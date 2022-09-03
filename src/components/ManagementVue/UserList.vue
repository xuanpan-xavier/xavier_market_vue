<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/ManagementHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员管理</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="7">
          <el-input placeholder="请输入查询电话号码" v-model="queryInfo.query" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input></el-col>
        <el-col :span="4">
          <el-button type="warning" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe style="width: 100%"  height="400">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="用户名" prop="Name"></el-table-column>
        <el-table-column label="电话号吗" prop="VipCard.Telephone"></el-table-column>
        <el-table-column label="会员开通时间" prop="VipCard.StartTime"></el-table-column>
        <el-table-column label="会员结束时间" prop="VipCard.EndTime"></el-table-column>
        <el-table-column label="操作" >
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.Telephone)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.Telephone)"></el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showVIPDialog(scope.row.Telephone)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1,2,5,10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed">
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="70px">
        <el-form-item label="用户名" prop="Name">
          <el-input v-model="addForm.Name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="Telephone">
          <el-input v-model="addForm.Telephone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="addForm.Password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="warning" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClosed">
      <el-form :model="editForm" :rules="editRules" ref="editRef" label-width="70px">
        <el-form-item label="用户名" prop="Name" >
          <el-input v-model="editForm.Name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="Telephone">
          <el-input v-model="editForm.Telephone" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password" >
          <el-input v-model="editForm.Password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="warning" @click="EditDialog">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改会员权限"
      :visible.sync="VIPDialogVisible"
      width="30%"
      @close="VIPDialogClosed">
      <el-form :model="VIPForm" :rules="VIPRules" ref="VIPRef" label-width="70px">
        <el-form-item label="电话" prop="Telephone">
          <el-input v-model="VIPForm.Telephone" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="StartTime" >
          <el-input v-model="VIPForm.StartTime"></el-input>
        </el-form-item>
        <el-form-item label="截止时间" prop="EndTime" >
          <el-input v-model="VIPForm.EndTime"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="VIPDialogVisible = false">取 消</el-button>
    <el-button type="warning" @click="VIPDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      // 获取用户列表参数对象
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      VIPDialogVisible: false,
      addForm: {
        Name: '',
        Telephone: '',
        Password: ''
      },
      editForm: {
        Name: '',
        Telephone: '',
        Password: ''
      },
      VIPForm: {
        Telephone: '',
        StartTime: '',
        EndTime: ''
      },
      addRules: {
        Name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        Telephone: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '电话号码正确长度为 11 个字符',
            trigger: 'blur'
          }
        ],
        Password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      },
      editRules: {
        Name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        Password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      },
      VIPRules: {
        StartTime: [],
        EndTime: []
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('VIP/show', { params: this.queryInfo })
      if (res.code !== 200) return this.$message.error('获取用户列表失败!')
      this.userList = res.data.data
      this.total = res.data.total
      console.log(res)
    },
    // 监听 pageSize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },
    addDialogClosed () {
      this.$refs.addRef.resetFields()
    },
    editDialogClosed () {
      this.$refs.editRef.resetFields()
    },
    VIPDialogClosed () {
      this.$refs.VIPRef.resetFields()
    },
    addUser () {
      this.$refs.addRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('VIP', this.addForm)
        if (res.code !== 200) {
          return this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功!')
        this.addDialogVisible = false
        await this.getUserList()
      })
    },
    async showEditDialog (Telephone) {
      const { data: res } = await this.$http.get('VIP/' + Telephone)
      if (res.code !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm.Name = res.data.VIP.Name
      this.editForm.Telephone = res.data.VIP.Telephone
      this.editDialogVisible = true
    },
    async showVIPDialog (Telephone) {
      const { data: res } = await this.$http.get('VIP/' + Telephone)
      if (res.code !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.VIPForm.Telephone = res.data.VIP.Telephone
      this.VIPForm.StartTime = res.data.VIP.VipCard.StartTime
      this.VIPForm.EndTime = res.data.VIP.VipCard.EndTime
      this.VIPDialogVisible = true
    },
    EditDialog () {
      this.$refs.editRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('VIP/' + this.editForm.Telephone, this.editForm)
        if (res.code !== 200) {
          return this.$message.error('修改用户信息失败！')
        }
        this.$message.success('修改用户信息成功!')
        this.editDialogVisible = false
        await this.getUserList()
      })
    },
    VIPDialog () {
      this.$refs.VIPRef.validate(async valid => {
        if (!valid) return
        if (this.VIPForm.StartTime > this.VIPForm.EndTime) return this.$message.error('时间设置失败！')
        const { data: res } = await this.$http.put('VIP/set/' + this.VIPForm.Telephone, this.VIPForm)
        if (res.code !== 200) {
          return this.$message.error('修改会员权限失败！')
        }
        this.$message.success('修改会员权限成功!')
        this.VIPDialogVisible = false
        await this.getUserList()
      })
    },
    async removeUserById (Telephone) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('删除操作已取消')
      }
      const { data: res } = await this.$http.delete('VIP/' + Telephone)
      if (res.code !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      await this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>

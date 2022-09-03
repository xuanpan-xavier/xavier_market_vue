<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/ManagementHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--      搜索-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入查询电话号码" clearable v-model="queryInfo.query" @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="warning" @click="addDialogVisible=true">创建订单</el-button>
        </el-col>
      </el-row>
      <!--      表格-->
      <el-row>
        <el-table :data="orderList" border style="width: 100%" height="400">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="ID" label="订单编号"></el-table-column>
          <el-table-column prop="Telephone" label="用户电话号码"></el-table-column>
          <el-table-column prop="CreatedAt" label="下单时间" width="250px"></el-table-column>
          <el-table-column label="操作" width="150px">
            <template v-slot="scope">
              <el-button type="warning" size="mini" icon="el-icon-info" @click="showEditDialog(scope.row.ID)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.ID)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--      分页区-->
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <el-dialog
      title="创建订单"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed">
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="电话" prop="Telephone">
          <el-input v-model="addForm.Telephone"></el-input>
        </el-form-item>
        <el-form-item label="商品id" prop="GoodsID">
          <el-tag
            :key="tag"
            v-for="tag in addForm.GoodsID"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="warning" @click="addGoods">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="查看订单详情"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClosed">

      <el-row>订单id:{{ editForm.ID }}</el-row>
      <el-divider></el-divider>
      <el-row>订单生成时间:{{ editForm.CreatedAt }}</el-row>
      <el-divider></el-divider>
      <el-row>手机号:{{ editForm.Telephone }}</el-row>
      <el-divider></el-divider>
      <el-row :index="item.id + ''" v-for="item in editForm.Goods" :key="item.id">
        <el-col span="12">商品名称：{{item.Name}}</el-col>
        <el-col span="6">种类：{{item.Category}}</el-col>
        <el-col span="6">价格：{{item.Price}}</el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data () {
    return {
      inputVisible: false,
      inputValue: '',
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      // 订单列表的数据
      orderList: [],
      // 订单的总数量
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        Telephone: '',
        GoodsID: []
      },
      editForm: {
      },
      addRules: {
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
        ]
      }
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    // 获取订单列表数据
    async getOrderList () {
      const { data: res } = await this.$http.get('Order/show', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error('获取订单列表失败!')
      }
      this.$message.success('获取订单列表成功!')
      this.orderList = res.data.data
      this.total = res.data.total
      console.log(res, this.orderList, this.total)
    },
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getOrderList()
    },
    handleCurrentChange (newCurrent) {
      this.queryInfo.pageNum = newCurrent
      this.getOrderList()
    },
    handleClose (tag) {
      this.addForm.GoodsID.splice(this.addForm.GoodsID.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.addForm.GoodsID.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    async removeById (ID) {
      const confirmResult = await this.$confirm('此操作将永久删除该记录, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('删除操作已取消!')
      }
      const { data: res } = await this.$http.delete('Order/' + ID)
      if (res.code !== 200) {
        return this.$message.error('删除失败!')
      }
      await this.getOrderList()
      this.$message.success('删除成功!')
    },
    addDialogClosed () {
      this.$refs.addRef.resetFields()
    },
    editDialogClosed () {
      this.$refs.editRef.resetFields()
    },
    addGoods () {
      this.$refs.addRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('Order', this.addForm)
        if (res.code !== 200) {
          return this.$message.error('创建订单失败！')
        }
        this.$message.success('创建订单成功!')
        this.addDialogVisible = false
        await this.getOrderList()
      })
    },
    async showEditDialog (ID) {
      const { data: res } = await this.$http.get('Order/' + ID)
      if (res.code !== 200) {
        return this.$message.error('查询订单信息失败！')
      }
      this.editForm = res.data.order
      console.log(this.editForm)
      this.editDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin: 15px 0 5px;
}
.el-cascader {
  width: 100%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

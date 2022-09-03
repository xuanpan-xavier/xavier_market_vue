<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/UserHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--      搜索-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入查询订单编号" clearable v-model="queryInfo.query" @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!--      表格-->
      <el-row>
        <el-table :data="orderList" border style="width: 100%" height="400">
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="ID" label="订单编号"></el-table-column>
          <el-table-column prop="CreatedAt" label="下单时间"></el-table-column>
          <el-table-column label="操作" width="250px">
            <template v-slot="scope">
              <el-button type="warning" icon="el-icon-info"  @click="showEditDialog(scope.row.ID)"></el-button>
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
import { mapState } from 'vuex'

export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo
  }),
  name: 'OrderInfo',
  data () {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      // 订单列表的数据
      orderList: [],
      // 订单的总数量
      total: 0,
      editDialogVisible: false,
      editForm: {
      }
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    // 获取订单列表数据
    async getQuery () {
      this.queryInfo.query = this.userInfo.Telephone
    },
    async getOrderList () {
      await this.getQuery()
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
    editDialogClosed () {
      this.$refs.editRef.resetFields()
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
</style>

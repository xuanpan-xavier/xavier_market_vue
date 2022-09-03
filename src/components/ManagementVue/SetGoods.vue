<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/ManagementHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 按钮搜索/添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入查询商品类型" @clear="getGoodsList" clearable v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="warning" @click="addDialogVisible=true">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table区域 -->
      <el-row>
        <el-table :data="goodsList" border style="width: 100%"  height="400">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="Name" label="商品名称"></el-table-column>
          <el-table-column prop="Category" label="商品类型" width="150px"></el-table-column>
          <el-table-column prop="Price" label="价格(元)" width="150px"></el-table-column>
          <el-table-column label="操作" width="150px">
            <template v-slot="scope">
              <el-button type="warning" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.ID)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.ID)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
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
    </el-card>
    <el-dialog
      title="添加商品"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed">
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="商品名称" prop="Name">
          <el-input v-model="addForm.Name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="Category">
          <template>
            <el-select v-model="addForm.Category" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="价格" prop="Price">
          <el-input v-model="addForm.Price"></el-input>
        </el-form-item>
<!--        <el-form-item label="商品图片" prop="Img">-->
<!--          <el-upload-->
<!--            action=""-->
<!--            accept=".jpg,.png"-->
<!--            :on-change="getFile"-->
<!--            :on-preview="handlePreview"-->
<!--            :on-remove="handleRemove"-->
<!--            :file-list="fileList"-->
<!--            :auto-upload="false"-->
<!--            list-type="picture">-->
<!--            <el-button size="small" type="warning">点击上传</el-button>-->
<!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="warning" @click="addGoods">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改商品信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClosed">
      <el-form :model="editForm" :rules="editRules" ref="editRef" label-width="70px">
        <el-form-item label="价格（元）" prop="Price" >
          <el-input v-model="editForm.Price"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="warning" @click="EditDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SetGoods',
  data () {
    return {
    // 查询参数对象
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      // 商品列表
      goodsList: [],
      // 总数据条数
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      options: [
        {
          value: '果蔬生鲜',
          label: '果蔬生鲜'
        },
        {
          value: '熟食冻品',
          label: '熟食冻品'
        },
        {
          value: '粮油调味',
          label: '粮油调味'
        },
        {
          value: '休闲零食',
          label: '休闲零食'
        },
        {
          value: '水饮冲调',
          label: '水饮冲调'
        },
        {
          value: '美妆个护',
          label: '美妆个护'
        },
        {
          value: '家居百货',
          label: '家居百货'
        },
        {
          value: '日用品',
          label: '日用品'
        },
        {
          value: '文体玩具',
          label: '文体玩具'
        },
        {
          value: '服装首饰',
          label: '服装首饰'
        },
        {
          value: '电子产品',
          label: '电子产品'
        }
      ],
      addForm: {
        Name: '',
        Category: '',
        Price: ''
      },
      editForm: {
        Price: '',
        ID: ''
      },
      addRules: {
        Name: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }
        ],
        Category: [
          {
            required: true,
            message: '请输入商品类型',
            trigger: 'blur'
          }
        ],
        Price: [
          {
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          }
        ]
      },
      editRules: {
        Price: [
          {
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 根据分页获取列表数据
    async getGoodsList () {
      const { data: res } = await this.$http.get('Goods/show', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error('获取商品列表失败!')
      }
      this.$message.success('获取商品列表成功!')
      this.goodsList = res.data.data
      this.total = res.data.total
      console.log(res)
    },
    // 显示的页数改变
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getGoodsList()
    },
    // 页码的改变
    handleCurrentChange (newValue) {
      this.queryInfo.pageNum = newValue
      this.getGoodsList()
    },
    async removeById (ID) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('删除操作已取消!')
      }
      const { data: res } = await this.$http.delete('Goods/' + ID)
      if (res.code !== 200) {
        return this.$message.error('删除失败!')
      }
      this.$message.success('删除成功!')
      await this.getGoodsList()
    },
    addDialogClosed () {
      this.$refs.addRef.resetFields()
    },
    editDialogClosed () {
      this.$refs.editRef.resetFields()
    },
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePreview (file) {
    //   console.log(file)
    // },
    // getFile (file, fileList) {
    //   this.getBase64(file.raw).then(res => {
    //     console.log(res)
    //     this.addForm.ImgData = res
    //   })
    // },
    // getBase64 (file) {
    //   return new Promise(function (resolve, reject) {
    //     const reader = new FileReader()
    //     let imgResult = ''
    //     reader.readAsDataURL(file)
    //     reader.onload = function () {
    //       imgResult = reader.result
    //     }
    //     reader.onerror = function (error) {
    //       reject(error)
    //     }
    //     reader.onloadend = function () {
    //       resolve(imgResult)
    //     }
    //   })
    // },
    addGoods () {
      this.$refs.addRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('Goods', this.addForm)
        if (res.code !== 200) {
          return this.$message.error('添加商品失败！')
        }
        this.$message.success('添加商品成功!')
        this.addDialogVisible = false
        await this.getGoodsList()
      })
    },
    async showEditDialog (ID) {
      const { data: res } = await this.$http.get('Goods/' + ID)
      if (res.code !== 200) {
        return this.$message.error('查询商品信息失败！')
      }
      this.editForm.Price = res.data.goods.Price
      this.editForm.Stock = res.data.goods.Stock
      this.editForm.ID = res.data.goods.ID
      console.log(this.editForm)
      this.editDialogVisible = true
    },
    EditDialog () {
      this.$refs.editRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('Goods/' + this.editForm.ID, this.editForm)
        if (res.code !== 200) {
          return this.$message.error('修改商品信息失败！')
        }
        this.$message.success('修改商品信息成功!')
        this.editDialogVisible = false
        await this.getGoodsList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin: 15px 0 0;
}
</style>

<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/UserHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>积分兑换</el-breadcrumb-item>
      <el-breadcrumb-item>积分商城</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <h2 class="point_label">积分兑换</h2>
      </el-row>
      <el-row>
        <el-col ><span class="point_label">现存积分点数: {{VIPInfo.Point}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8" v-for="item in awardList" :key="item.id">
          <el-card class="award" :body-style="{ padding: '0px' }">
            <img src="@/assets/since.png" class="image" alt="" width="300" height="300">
            <div style="padding: 14px;">
              <span class="point_label">{{ item.label }}</span>
              <div class="bottom clearfix">
                <span class="award_label">所需积分：{{ item.pointNeed }}</span>
                <el-button type="warning" round size="mini" class="button" @click=UsePoint(item.pointNeed)>兑换</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo
  }),
  data () {
    return {
      VIPInfo: {
        Point: ''
      },
      awardList: [
        {
          label: '五元代金券',
          pointNeed: 50
        },
        {
          label: '十元代金券',
          pointNeed: 100
        },
        {
          label: '二十元代金券',
          pointNeed: 200
        }
      ]
    }
  },
  created () {
    this.GetPoint()
  },
  methods: {
    async GetPoint () {
      const { data: res } = await this.$http.get('VIP/' + this.userInfo.Telephone)
      if (res.code !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.VIPInfo.Point = res.data.VIP.VipCard.Point
    },
    async UsePoint (pointNeed) {
      const confirmResult = await this.$confirm('确定使用积分兑换此代金券?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('兑换操作已取消')
      }
      if (pointNeed > this.VIPInfo.Point) {
        return this.$message.error('积分不足！')
      }
      const { data: res } = await this.$http.put('VIP/point', { Telephone: this.userInfo.Telephone, Minus: pointNeed })
      if (res.code !== 200) {
        return this.$message.error('兑换失败！')
      }
      this.$message.success('兑换成功！')
      await this.GetPoint()
    }
  }
}
</script>

<style lang="less" scoped>
.el-header{
  color: #ca6924;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  border-radius: 4px
}
.el-main{
  height: 100%;
}
.el-footer{
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  border-radius: 15px
}
.payButton{
  border-radius: 30px;
  width: 120px;
  height: 50px;
}
.typeLabel{
  margin-left: 15px;
}
.el-col{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.point_label{
  font-size: 20px;
  color: #ca6924;
}
.award{
  margin-top: 40px;
  margin-left: 40px;
}
.award_label{
  font-size: 16px;
  color: #ca6924;
}
</style>

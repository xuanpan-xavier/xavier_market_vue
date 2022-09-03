<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/UserHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员信息</el-breadcrumb-item>
      <el-breadcrumb-item>会员充值</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <h2 class="VIP_label">成为会员</h2>
      </el-row>
      <el-row>
        <el-col span="6"><span class="VIP_time_label">会员开始时间: {{ VIPInfo.StartTime }}</span></el-col>
        <el-col span="6" offset="10"><span class="VIP_time_label">会员截止时间: {{ VIPInfo.EndTime }}</span></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col span="4">
        <h4 style="margin-bottom: 15px" class="label_select">选择期限</h4>
        </el-col>
      </el-row>
      <el-row>
        <el-radio-group type="warning" v-model="amountVal" @change="timeChange">
          <el-radio-button border type="warning" :label="'' + 1">充值1年</el-radio-button>
          <el-radio-button border type="warning" :label="'' + 2">充值2年</el-radio-button>
          <el-radio-button border type="warning" :label="'' + 3">充值3年</el-radio-button>
          <el-radio-button border type="warning" :label="'' + 5">充值5年</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col span="4">
          <h4 style="margin-bottom: 15px" class="label_select">选择支付方式</h4>
        </el-col>
      </el-row>
      <el-row>
        <el-radio-group v-model="rechargeParams.paymentType" @change="paymentTypeChange">
          <el-radio border :label="'' + 0">微信</el-radio>
          <el-radio border :label="'' + 1">支付宝</el-radio>
        </el-radio-group>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col span="4">
          <h4 style="margin-bottom: 15px" class="label_select">充值金额</h4>
        </el-col>
        <el-col span="4">
          <h4 style="margin-bottom: 15px" class="label_select">{{ VIPCost[this.amountVal] }}</h4>
        </el-col>
      </el-row>
      <div style="text-align: center; margin-top: 30px">
        <el-button type="warning" @click="surePay">确认支付</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SetVIP',
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo
  }),
  data () {
    return {
      amountVal: '',
      disabled: false,
      VIPInfo: {
        StartTime: '',
        EndTime: '',
        IsVIP: ''
      },
      VIPCost: {
        1: 3.65,
        2: 7,
        3: 10,
        5: 15
      },
      rechargeParams: {
        time: '',
        paymentType: '0'
      }

    }
  },
  created () {
    this.GetVIPTime()
  },
  methods: {
    timeChange (val) {
      this.rechargeParams.time = val
      if (val === '') {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    paymentTypeChange (val) {
      this.rechargeParams.paymentType = val
    },
    async GetVIPTime () {
      const { data: res } = await this.$http.get('VIP/' + this.userInfo.Telephone)
      if (res.code !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.VIPInfo.StartTime = res.data.VIP.VipCard.StartTime
      this.VIPInfo.EndTime = res.data.VIP.VipCard.EndTime
      this.VIPInfo.IsVIP = res.data.IsVIP
      if (res.data.VIP.VipCard.StartTime === '0001-01-01') this.$message.info('您为非VIP用户，请充值成为VIP，享受尊贵服务！')
      else if (res.data.IsVIP === '0') this.$message.info('您的VIP已到期，请充值续费VIP，享受尊贵服务！')
    },
    async surePay () {
      if (this.rechargeParams.time === '') {
        this.$message.warning('请选择充值年限')
        return
      }
      const { data: res } = await this.$http.put('VIP/user/' + this.userInfo.Telephone, { IsVIP: this.VIPInfo.IsVIP, Year: this.amountVal })
      if (res.code !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.$message.success('充值VIP成功！')
      this.GetVIPTime()
    }
  }
}
</script>

<style lang="less" scoped>
.VIP_label{
  font-size: 20px;
  color: #ca6924;
}
.label_select{
  margin-top: 20px;
  margin-left: 10px;
  color: #ca6924;
}

</style>

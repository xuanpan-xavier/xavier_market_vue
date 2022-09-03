<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/UserHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据分析</el-breadcrumb-item>
      <el-breadcrumb-item>会员简报</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h2 class="VIP_label">会员数据简报</h2>
             <div
          class="echart1"
          id="mychart1"
          :style="{ float: 'left', width: '50%', height: '400px' }"
        ></div>
      <h4 class="VIP_label2">近期消费记录</h4>
             <div
          class="echart2"
          id="mychart2"
          :style="{ float: 'left', width: '50%', height: '400px' }"
        ></div>

    </el-card>
  </div>
</template>

<script>

import * as $echarts from 'echarts'
import { mapState } from 'vuex'

export default {
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo
  }),
  name: 'VIPData',
  data () {
    return {
      goodCategory: [],
      goodCost: [],
      p: {
        Telephone: ''
      },
      data: [],
      Date: [],
      Total: [],
      dian: [],
      fu: [],
      guo: [],
      jia: [],
      liang: [],
      mei: [],
      ri: [],
      shu: [],
      shui: [],
      wen: [],
      xiu: []
    }
  },
  mounted () {
    this.initEcharts1()
    this.initEcharts2()
  },
  methods: {
    async initEcharts1 () {
      this.p.Telephone = this.userInfo.Telephone
      const { data: res } = await this.$http.get('Order/pie', { params: this.p })
      if (res.code !== 200) {
        return this.$message.error('获取用户数据失败!')
      }
      this.$message.success('获取用户数据成功!')
      this.goodCategory = res.data.Category
      this.goodCost = res.data.Number
      const d = []
      for (let i = 0; i < this.goodCost.length; i++) { d.push({ value: this.goodCost[i], name: this.goodCategory[i] }) }
      const option = {
        title: {
          text: '消费种类统计',
          left: 'center',
          size: 20,
          top: 0,
          textStyle: {
            color: '#ca6924'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '10%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: d
          },
          this.$http.put('/', { data: d })
        ]
      }
      const myChart = $echarts.init(document.getElementById('mychart1'))// 图标初始化
      myChart.setOption(option)// 渲染页面
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    async initEcharts2 () {
      this.p.Telephone = this.userInfo.Telephone
      const { data: res } = await this.$http.get('Order/bar', { params: this.p })
      if (res.code !== 200) {
        return this.$message.error('获取用户数据失败!')
      }
      this.$message.success('获取用户数据成功!')
      this.Date = res.data.Date
      this.Total = res.data.Total
      this.dian = res.data.dian
      this.fu = res.data.fu
      this.guo = res.data.guo
      this.jia = res.data.jia
      this.liang = res.data.liang
      this.mei = res.data.mei
      this.ri = res.data.ri
      this.shu = res.data.shu
      this.wen = res.data.wen
      this.xiu = res.data.xiu
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.Date
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '订单总支出',
            type: 'bar',
            data: this.Total,
            emphasis: {
              focus: 'series'
            },
            markLine: {
              lineStyle: {
                type: 'dashed'
              },
              data: [[{ type: 'min' }, { type: 'max' }]]
            }
          },
          {
            name: '果蔬生鲜',
            type: 'bar',
            barWidth: 5,
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.guo
          },
          {
            name: '熟食冻品',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.shu
          },
          {
            name: '粮油调味',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.liang
          },
          {
            name: '休闲零食',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.xiu
          },
          {
            name: '水饮冲调',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.shui
          },
          {
            name: '美妆个护',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.mei
          },
          {
            name: '家居百货',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.jia
          },
          {
            name: '日用品',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.ri
          },
          {
            name: '文体玩具',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.wen
          },
          {
            name: '服装首饰',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.fu
          },
          {
            name: '电子产品',
            type: 'bar',
            stack: '订单总支出',
            emphasis: {
              focus: 'series'
            },
            data: this.dian
          }
        ]
      }
      const myChart = $echarts.init(document.getElementById('mychart2'))// 图标初始化
      myChart.setOption(option)// 渲染页面
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.VIP_label{
  font-size: 30px;
  color: #ca6924;
}
.VIP_label2{
  font-size: 20px;
  color: #ca6924;
}
.echart1{
  margin-top: 10px;
}
</style>

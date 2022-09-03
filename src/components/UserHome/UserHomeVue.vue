<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../../assets/logo.png" alt="" width="200" height="60">
      </div>
      <span class="title">X超市会员系统</span>
      <el-button type="warning" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#fff"
          text-color="#ca6924"
          active-text-color="#FA4609"
          unique-opened="true"
          router="true"
          default-active=""
        >
          <el-submenu  :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class='item.icon'></i>
              <span>{{item.authorname}}</span>
            </template>
            <el-menu-item :index="subItem.path" v-for="subItem in item.child" :key="subItem.id">{{subItem.authorname}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HomeVue',
  data: function () {
    return {
      // 左侧菜单数据
      menulist: [
        {
          authorname: '用户信息',
          id: 'UserInfo',
          icon: 'el-icon-user',
          child: [{
            authorname: '信息修改',
            path: 'SetUser'
          }
          ]
        },
        {
          authorname: '会员信息',
          id: 'VIPInfo',
          icon: 'icon-vip',
          child: [{
            authorname: '会员充值',
            path: 'SetVIP'
          }]
        },
        {
          authorname: '积分兑换',
          id: 'GoShopping',
          icon: 'el-icon-shopping-cart-2',
          child: [{
            authorname: '积分商城',
            path: 'Shopping'
          }]
        },
        {
          authorname: '订单管理',
          id: 'OrderManagemnet',
          icon: 'el-icon-coin',
          child: [{
            authorname: '查看订单',
            path: 'OrderInfo'
          }
          ]
        },
        {
          authorname: '数据分析',
          id: 'DataAnalysis',
          icon: 'el-icon-pie-chart',
          child: [{
            authorname: '会员简报',
            path: 'VIPData'
          }
          ]
        }
      ]
    }
  },
  created () {
    // this.getMunuList()
  },
  methods: mapActions('userModule', ['logout'])
}
</script>

<style lang="less" scoped>
.home_container{
  height: 100%;
}
.el-header{
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
}
.title{
  color: #ca6924;
  font-weight:bold;
  font-size: 20px;
}
.el-aside{
  background-color: #ca6924;
}

.el-menu{
  height: 100%;
  border-right: 0 ;
}
.el-main{
  background-color: #eaedf1;
}
.icon-vip{
  margin-right: 8px;
}
</style>

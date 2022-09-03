<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../../assets/logo.png" alt="" width="200" height="60">
      </div>
      <span class="title">X超市后台管理系统</span>
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
          authorname: '会员管理',
          id: 'UserManagement',
          icon: 'el-icon-user',
          child: [{
            authorname: '会员列表',
            path: 'UserList'
          }
          ]
        },
        {
          authorname: '订单管理',
          id: 'OrderManagement',
          icon: 'el-icon-coin',
          child: [{
            authorname: '订单列表',
            path: 'OrderList'
          }]
        },
        {
          authorname: '商品管理',
          id: 'GoodsManagement',
          icon: 'el-icon-goods',
          child: [{
            authorname: '商品设置',
            path: 'SetGoods'
          }]
        },
        {
          authorname: '数据分析',
          id: 'DataAnalysis',
          icon: 'el-icon-pie-chart',
          child: [
            {
              authorname: '会员数据',
              path: 'UserData'
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

<style scoped>
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
</style>

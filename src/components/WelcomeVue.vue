<template>
  <div class="welcome">
    <h2>
      Welcome
    </h2>
    <h2>
      {{ userInfo.Name }}
    </h2>
    <h3>
      欢迎登录到X超市会员系统!
    </h3>
    <div class="info">
      <ul>
        <li>
          <a href="https://github.com/xuanpan-xavier" target="_blank">xuanpan-xavier</a>
          <span>Github 个人入口</span>
        </li>
        <li>
          <a href="https://github.com/xuanpan-xavier/xavier_market_vue" target="_blank">xavier_market</a>
          <span>Github 课设源码</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WelcomeVue.vue',
  computed: mapState({
    userInfo: (state) => state.userModule.userInfo
  })
}
</script>
<style lang="less" scoped>
.welcome {
  margin: 30px auto 0;
  font-size: 20px;
  text-align: center;
  color: #ca6924;
  h3 {
    margin: 50px auto 0;
    font-size: 30px;
  }
  .info {
    margin: 15px 0 10px;
  }
}
</style>

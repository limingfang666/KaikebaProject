<template>
  <div>
       <h3>用户中心</h3>
        <ul class="left">
            <router-link exact tag="li" :to="{name: 'user'}">基本信息</router-link>
            <router-link tag="li" :to="{name: 'user-cart'}">我的购物车</router-link>
        </ul>
        <div class="right">
            <router-view></router-view>
        </div>
  </div>
</template>

<script>
export default {
    name: 'User'
}
</script>

<style scoped>
.left {
    float: left;
    width: 200px;
}
.left li {
    line-height: 30px;
    cursor: pointer;
}
</style>
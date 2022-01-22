<template>
  <div>
    <template v-if="item">
      <h2>商品详情 - {{item.name}}</h2>
      <dt>ID</dt>
      <dd>{{item.id}}</dd>
      <dt>名称</dt>
      <dd>{{item.name}}</dd>
      <dt>价格</dt>
      <dd>{{item.price|RMB}}</dd>
    </template>
    <template v-else>
      <h2>没有该商品信息</h2>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import RMB from "@/filter/RMB";

export default {
  name: "Item",
  // 注册过滤器
  filters: {
    RMB
  },
  data() {
    return {
      item:null
    };
  },
  created() {
    // 通过动态路由和拼接字符串形式都需要通过 路由对象 获取id的值
    const {id} = this.$route.params;
    
    axios({
      // 详情页:id占位符
      // url: "/api/item/"+id
      url: `/api/item/${id}`
    }).then(res => {
      this.item = res.data;
    });
  }
};
</script>

<style>
</style>
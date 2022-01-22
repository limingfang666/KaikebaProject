<template>
  <div class="home">
    <h2>商品列表——首页</h2>
    <!-- 使用v-model 绑定排序，并使用 watch进行监听-->
    <select v-model="sort">
      <option value="desc">从高到低</option>
      <option value="asc">从低到高</option>
    </select>
    <ul class="item-list">
      <li class="head">
        <span>名称</span>
        <span>品牌</span>
        <span>价格</span>
        <span>操作</span>
      </li>
      <li v-for="item of items" :key="item.id">
        <span>{{item.name}}</span>
        <span>{{item.vendor}}</span>
        <span>{{item.price|RMB}}</span>
        <span>
          <!-- 注意：用v-bind方式，则属性值里必须是表达式-->
          <!-- <router-link :to="`/item/${item.id}`">查看详情</router-link> -->

          <!-- 以动态路由形式赋值,注意一定要以v-bind形式进行绑定,后台路由需要设置name:'item' -->
          <router-link :to="{name: 'item', params:{id: item.id}}">查看详情</router-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import RMB from "@/filter/RMB";

export default {
  name: "Home",
  // 注册过滤器
  filters: {
    RMB
  },
  // 注意是在created生命周期中发送请求（组件渲染完成后）
  data() {
    return {
      items: [],
      sort: "desc"
    };
  },
  async created() {
    //  注意this.sort获取位置，是在组件渲染完后立即赋值，否则有可能没有获取到，从而产生异步问题
    this.sort = this.$route.query.sort || this.sort;

    // 注意请求需要使用async await
    await this.getItems();
  },
  // 使用watch监听组件变化,注意watch是对象
  watch: {
    sort() {

      // 监听到sort发生变化后重新发起请求（但是这样不会在url上带上sort=desc不利于分享状态）
      // await this.getItems();

      // 然后通过编程式导航进行跳转(可以拼接字符串，也可以对象形式传参)
      // this.$router.push('/?sort=' + this.sort);

      this.$router.push({
        // 此处name对应路由中Home组件的路由name
        name: "home",
        // 此处为地址栏上地址加上queryString
        query: {
          sort: this.sort
        }
      });

    },
    // 如果使用了路由守卫就不用监听$route
    // 因为vue组件的复用性（vue在地址改变后，发现还是组件还是之前的组件，就不会进行重新创建），光使用queryString+this.$router.push还无法真正刷新页面
    // async $route() {
    //   // 监听到变化时再发一次请求
    //   await this.getItems();
    // }
  },
  methods:{
    async getItems(){
      await axios({
        // 通过axios发起异步代理请求
        url: "/api/items",
        // 此处为发送给后台请求地址加上queryString
        params: {
          sort: this.sort
        }
      }).then(res => {
        // 将获取到的值设置到data中
        this.items = res.data;
      });
    }
  },
  // 组件内守卫，在特定组件中使用
  // 当路由解析完成，并中指定的组件渲染之前
  // next('/') 或者 next({ path: '/' }) : 跳转到一个不同的地址
  beforeRouteEnter(to, from, next){
    console.log("beforeRouteEnter");
    // 此处处理在组件渲染之前，先跳转到其他地址
    // 注意next之前不能调用this获取实例
     console.log(this);//undefined
    // next(_this=>{
    //   console.log(_this);//此处_this即为组件实例
    // });
    next();
  },
  // 组件被复用时调用（更新）：如表单填写后离开页面时询问是否要提交页面等需求
  beforeRouteUpdate(to, from, next){
    // 注意不是使用了路由守卫这里就不需要this.$router.push()，这是为了编程的方式来导航（跳转）
    // 此处使用了this.$router.push()方法，阻隔了组件的复用性，所以组件复用时就会调用
    console.log("beforeRouteUpdate");
    // 更新时，只有此处next()确认后才能生效
    // 使用路由守卫发起请求，不再监听$route对象
    this.getItems();
    next();
  },
  // 导航离开该组件时调用
  beforeRouteLeave(to, from, next){
    console.log("beforeRouteLeave");
    next();
  }
};
</script>

<style>
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.item-list li {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px dotted #333;
}
.item-list li.head {
  font-weight: bold;
}
.item-list li span {
  min-width: 200px;
}
</style>
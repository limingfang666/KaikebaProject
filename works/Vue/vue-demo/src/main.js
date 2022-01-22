import Vue from 'vue'
import App from './App.vue'
// 引入自定义router，注意这里router.js是在main.js的同级目录
import myRouter from './router'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router: myRouter
}).$mount('#app')
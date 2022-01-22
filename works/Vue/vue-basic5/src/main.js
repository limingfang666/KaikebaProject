import Vue from 'vue'
import App from './App.vue'
import appRouter from './route'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router: appRouter
}).$mount('#app')
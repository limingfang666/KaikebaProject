import Vue from 'vue'
import Router from 'vue-router'

// @自动定位到src目录
import Home from '@/components/Home.vue';
import About from '@/components/About.vue';

// 注意Vue.use()的值为Router不是创建后的myRouter
Vue.use(Router);

const myRouter = new Router({
    // 路由模式history,hash,abstract等
    mode: 'history',
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: About
        }
    ]
});

export default myRouter;
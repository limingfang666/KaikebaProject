import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import Item from '@/components/Item.vue'
import Login from '@/components/Login.vue'

import User from '@/components/User.vue'
import Profile from '@/components/Profile.vue'
import Cart from '@/components/Cart.vue'

Vue.use(Router)

const appRouter = new Router({
    mode: 'history',
    routes: [{
            name: "home",
            path: '/',
            component: Home
        },
        {
            name: "about",
            path: '/about',
            component: About,
            // 利用路由元信息进行鉴权
            meta: {
                requiresAuth: true
            }
        },
        {
            // 页面以动态路由形式赋值时:to='{name: "item", params:{id: item.id}}'，需要给路由设置name才能赋值
            name: 'item',

            //  :id配置在route配置时
            path: '/item/:id',
            component: Item,
            // 利用路由元信息进行鉴权
            meta: {
                // requiresAuth: true
            }
        },
        {
            name: "login",
            path: '/Login',
            component: Login
        },

        // 嵌套路由
        {
            // name: "user",
            path: '/user',
            component: User,
            children: [{
                name: "user-profile",
                // 嵌套路由的子路由使用 /  和不使用 / 有很大区别
                // path: 'Profile',
                // 直接写空，二父级没有定义name，则表示为父级默认显示页面
                path: '',
                component: Profile,
            }, {
                name: "user-cart",
                // 嵌套路由的子路由使用 /  和不使用 / 有很大区别
                path: 'Cart',
                component: Cart,
            }, ]
        },
    ]

});

// 全局守卫（处理如鉴权等需求）
// 当一个导航触发时，全局前置守卫按照创建顺序调用
let user = { id: 1 }
appRouter.beforeEach((to, from, next) => {
    // 点击About和Item（查看详情）时，需要进行鉴权
    console.log(to, from);
    // if (["about", "item"].includes(to.name) || user.id === 0) {
    //     next({ name: 'login' });
    // }

    // 利用路由元信息进行鉴权
    if (to.meta.requiresAuth) {
        next({ name: 'login' });
    } else {
        next();
    }
})

// 在所有组件内守卫和异步路由组件被解析之后被调用
appRouter.beforeResolve((to, from, next) => {
    next();
})

// 导航被确认后调用：因为导航已经被确认，所以没有 next
appRouter.afterEach((to, from) => {

})

export default appRouter;
import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/login.vue')
const Home = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
const Welcome = () =>
    import ( /* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')
const Users = () =>
    import ( /* webpackChunkName: "users" */ '../components/user/Users.vue')
const Rights = () =>
    import ( /* webpackChunkName: "power" */ '../components/power/Rights.vue')
const Roles = () =>
    import ( /* webpackChunkName: "power" */ '../components/power/Roles.vue')
const Cate = () =>
    import ( /* webpackChunkName: "goods" */ '../components/goods/Cates.vue')
const Params = () =>
    import ( /* webpackChunkName: "goods" */ '../components/goods/Params.vue')
const GoodsList = () =>
    import ( /* webpackChunkName: "goods" */ '../components/goods/List.vue')
const Add = () =>
    import ( /* webpackChunkName: "goods" */ '../components/goods/Add.vue')
const Order = () =>
    import ( /* webpackChunkName: "order_report" */ '../components/order/Order.vue')
const Report = () =>
    import ( /* webpackChunkName: "order_report" */ '../components/report/Report.vue')
    // import Login from '../components/login.vue'
    // import Home from '../components/Home.vue'
    // import Welcome from '../components/Welcome.vue'
    // import Users from '../components/user/Users.vue'
    // import Rights from '../components/power/Rights.vue'
    // import Roles from '../components/power/Roles.vue'
    // import Cate from '../components/goods/Cates.vue'
    // import Params from '../components/goods/Params.vue'
    // import GoodsList from '../components/goods/List.vue'
    // import Add from '../components/goods/Add.vue'
    // import Order from '../components/order/Order.vue'
    // import Report from '../components/report/Report.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: Users },
            { path: '/rights', component: Rights },
            { path: '/roles', component: Roles },
            { path: '/categories', component: Cate },
            { path: '/params', component: Params },
            { path: '/goods', component: GoodsList },
            { path: '/goods/add', component: Add },
            { path: '/orders', component: Order },
            { path: '/reports', component: Report }
        ]
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login')
        next()
    else {
        const tokenStr = window.sessionStorage.getItem('token')
        if (!tokenStr) {
            next('/login')
        } else {
            next()
        }
    }
})

export default router
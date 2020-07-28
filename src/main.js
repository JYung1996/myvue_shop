import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './plugins/element.js'
import './assets/font_w04pampveji/iconfont.css'
import axios from 'axios'
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
    // axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/';

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
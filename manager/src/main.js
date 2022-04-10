import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import App from './App.vue'
import router from './router'
import store from './store/index'
import './assets/css/globalstyle.css'



Vue.use(Vuex)
Vue.use(Element)

import echarts from 'echarts'
Vue.prototype.$echarts=echarts

new Vue({
    el: '#app',
    router: router,
    store: new Vuex.Store(store),
    render: h => h(App)
})

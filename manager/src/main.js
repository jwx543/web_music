import Vue from 'vue'
import Vuex from 'vuex'
import VCharts from 'v-charts'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import App from './App.vue'
import router from './router'
import store from './store/index'
import './assets/css/main.css'
import './assets/icons/iconfont'


Vue.use(Vuex)
Vue.use(VCharts)
Vue.use(Element)

new Vue({
    el: '#app',
    router: router,
    store: new Vuex.Store(store),
    render: h => h(App)
})

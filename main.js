import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

import util from './common/util.js'
Vue.prototype.$util = util

import http from './common/request.js'
Vue.prototype.$http = http

import store from './store/index.js'
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

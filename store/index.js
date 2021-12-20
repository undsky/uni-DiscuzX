import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
import tabbar from './modules/tabbar.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		auth,
		tabbar
	}
})

export default store

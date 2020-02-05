import Vue from 'vue'
import App from './App.vue'
import Api from './js/api'
import VueRouter from "vue-router"

Vue.config.productionTip = false
Vue.prototype.$api = new Api('http://ya.ru')

Vue.use(VueRouter)

import CreateNodePage from './pages/CreateNode'
import MainPage from './pages/Main'

var routes = [
	{ path: '/create_node', component: CreateNodePage },
	{ path: '*', component: MainPage },
	// { path: '/create_node', component: CreateNodePage },
]

var router = new VueRouter({ routes })

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')

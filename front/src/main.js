import Vue from 'vue'
import App from './App.vue'
import Api from './js/api'
import VueRouter from "vue-router"

Vue.config.productionTip = false
Vue.prototype.$api = new Api()

Vue.use(VueRouter)

import CreateNodePage from './pages/CreateNode'
import NodePage from './pages/NodePage'
import NodeRpcPage from './pages/NodeRpcPage'

import MainPage from './pages/Main'

var routes = [
	{ path: '/create_node', component: CreateNodePage },

	{ path: '/nodes/rpc/:id', component: NodeRpcPage },
	{ path: '/nodes/:id', component: NodePage },
	{ path: '/nodes', component: NodePage },

	{ path: '*', component: MainPage },
	// { path: '/create_node', component: CreateNodePage },
]

var router = new VueRouter({ routes })

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')

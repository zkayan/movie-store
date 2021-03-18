import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Checkout from './views/Checkout'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/checkout', component: Checkout },
    ]
})
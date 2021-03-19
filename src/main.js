import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faImage, faTrash, faHeart, faStar, faSearch, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VTooltip from 'v-tooltip'
import VueTheMask from 'vue-the-mask'

require('@/assets/scss/_style.scss')

library.add(faShoppingCart, faImage, faTrash, faHeart, faStar, faSearch, faHeartBroken)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(VTooltip)
Vue.use(VueTheMask)

new Vue({
	router,
  store,
  render: h => h(App),
}).$mount('#app')

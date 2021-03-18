import Vue from 'vue'
import app from './app.vue'
import {router} from './router'
import {store} from './store/store'
import './assets/styles/main.scss'
import draggable from 'vuedraggable'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  draggable,
  render: h => h(app)
}).$mount('#app')



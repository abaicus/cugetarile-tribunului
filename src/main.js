import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Clipboard from 'v-clipboard'

Vue.config.productionTip = false
Vue.use(Clipboard)

new Vue({
  render: h => h(App),
}).$mount('#app')

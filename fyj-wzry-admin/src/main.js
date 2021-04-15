import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './http'
import './style.css'

Vue.config.productionTip = false

// 在http文件中导出一个对象 然后挂载到Vue的原型上 然后就可以访问axios对象上面的方法了

Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

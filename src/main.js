// import _ from 'lodash.filter';
import Vue from 'vue';
import './plugins';
import App from './App.vue';
import router from './router';
import './styles/style.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

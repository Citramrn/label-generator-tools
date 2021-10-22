import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// route menu sidebar
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/sku',
    name: 'sku',
    component: () => import('../views/templates/Sku.vue'),
  },
  {
    path: '/invoice',
    name: 'invoice',
    component: () => import('../views/templates/Invoice.vue'),
  },
  {
    path: '/shipping',
    name: 'shiiping',
    component: () => import('../views/templates/Shipping.vue'),
  },
  // {
  //     path: '/labelshipping',
  //     name: 'labelshipping',
  //     component: () => import('../components/LabelShipping'),
  // },
  // {
  //     path: '/labelinvoice',
  //     name: 'labelinvoice',
  //     component: () => import('../components/LabelInvoice'),
  // }
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

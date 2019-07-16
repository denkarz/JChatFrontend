import Vue from 'vue';
import App from './app/App.vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import routes from './app/routes';
import languages from './app/i18n';
import './registerServiceWorker';
import Logger from './app/logger';
import 'reflect-metadata';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Logger);

const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: languages.languages,
});


const router = new VueRouter({
  mode: 'history',
  routes: routes.routes,
});

new Vue({
  render: (h) => h(App),
  router,
  i18n,
}).$mount('#app');



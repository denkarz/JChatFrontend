import Vue from 'vue';
import App from './app/App.vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import routes from './app/routes';
import languages from './app/i18n';
import './registerServiceWorker';
import Logger from './app/logger';
import 'reflect-metadata';
import Vuex from 'vuex';
import {actions, getters, mutations, state} from '@/app/store/user';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Logger);
Vue.use(Vuex);

const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: languages.languages,
});

export default i18n;


const router = new VueRouter({
  mode: 'history',
  routes: routes.routes,
});


const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});


new Vue({
  render: (h) => h(App),
  router,
  store,
  i18n,
}).$mount('#app');



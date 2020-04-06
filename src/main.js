import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import NProgress from 'nprogress';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueFirestore from "vue-firestore";

Vue.use(VueFirestore);
Vue.use(BootstrapVue);
Vue.use(NProgress);

//const nprogress = new NProgress({ parent: ".nprogress-container" });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  NProgress.done();
});

    new Vue({
  router,
  //nprogress,
  render: h => h(App)
}).$mount("#app");

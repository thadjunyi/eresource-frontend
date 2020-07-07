/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.prototype.$hostname = "localhost:";
Vue.prototype.$hostport = "8080";

Vue.config.productionTip = false;
Vue.use(vuetify);

new Vue({
  router,
  store,
  vuetify,

  render: function(h) {
    return h(App);
  }
}).$mount("#app");

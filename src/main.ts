import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import install from "./setup";

Vue.config.productionTip = false;

install(Vue);

new Vue({
  render: h => h(App),
}).$mount("#app");

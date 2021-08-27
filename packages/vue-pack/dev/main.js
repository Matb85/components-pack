import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "@matb85/base-pack/dist/index.css";
import "@matb85/base-pack/dist/navbar.css";
import "@matb85/base-pack/dist/footer.css";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");

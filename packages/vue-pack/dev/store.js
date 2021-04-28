import Vue from "vue";
import Vuex from "vuex";
import { vuepack } from "../src/vuePackModule";
import "@matb85/base-pack/dist/index.css";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { vuepack },
});

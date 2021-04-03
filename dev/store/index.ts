import Vue from "vue";
import Vuex from "vuex";
import { vuepack } from "@/store/vuePackModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { vuepack },
});

import Vue from "vue";
import Vuex from "vuex";
import vuePackModule from "@/store/vuePackModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { vuePackModule },
});

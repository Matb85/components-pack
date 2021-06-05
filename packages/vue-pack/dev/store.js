import Vue from "vue";
import Vuex from "vuex";
import { vuepack } from "../src/vuePackModule";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { vuepack },
  state: () => ({
    vuepacksizes: {
      thumbnail: "thumbnail_",
      2400: "",
      1920: "fhd_",
      1290: "hd_",
      720: "wvga_",
      480: "hvga_",
    },
  }),
});

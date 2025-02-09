import { Store, mutations } from "@matb85/base-pack";
import { defineStore } from "pinia";

export const useVuePackStore = defineStore("vuepack", {
  state: () => ({
    vuepacksizes: null,
    state: null,
  }),
  actions: {
    setSizes(vuepacksizes) {
      this.vuepacksizes = vuepacksizes;
    },
    initStore() {
      this.state = Store();
    },
    /** @param {import('@matb85/base-pack').StoreDataI} payload */
    addPhoto(payload) {
      mutations.addPhoto(this.state, payload);
    },
    addHandler({ name, handler }) {
      mutations.addHandler(this.state, { name, handler });
    },
    removeHandler(name) {
      mutations.removeHandler(this.state, name);
    },
  },
});

import { Store, mutations } from "@matb85/base-pack";
import { defineStore } from "pinia";

export const useVuePackStore = defineStore("vuepack", {
  state: Store,
  actions: {
    init(vuepacksizes) {
      this.vuepacksizes = vuepacksizes;
    },
    /** @param {import('@matb85/base-pack').StoreDataI} payload */
    addphoto(payload) {
      mutations.addphoto(this, payload);
    },
    addHandler({ name, handler }) {
      mutations.addhandler(this, { name, handler });
    },
    removeHandler(name) {
      mutations.removeHandler(this, name);
    },
  },
});

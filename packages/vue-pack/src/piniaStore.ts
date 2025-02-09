import { Store, mutations, type StoreI, type GlobalConfigI, type StorePhotoI } from "@matb85/base-pack";
import { defineStore } from "pinia";

export const useVuePackStore = defineStore("vuepack", {
  state: () => ({
    vuepacksizes: null,
    state: null,
  } as {
    vuepacksizes: GlobalConfigI | null;
    state: StoreI | null;
  }),
  actions: {
    setSizes(vuepacksizes: GlobalConfigI) {
      this.vuepacksizes = vuepacksizes;
    },
    initStore() {
      this.state = Store();
    },
    addPhoto(payload: StorePhotoI) {
      mutations.addPhoto(this.state!, payload);
    },
    addHandler({ name, handler }: { name: string; handler: (target: HTMLImageElement) => void }) {
      mutations.addHandler(this.state!, { name, handler });
    },
    removeHandler(name: string) {
      mutations.removeHandler(this.state!, name);
    },
  },
});

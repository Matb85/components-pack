import { store } from "@matb85/base-pack";
const { Store, mutations } = store;

const sizes = {
  thumbnail: "thumbnail_",
  2400: "",
  1920: "fhd_",
  1290: "hd_",
  720: "wvga_",
  480: "hvga_",
};

export { Store };
export const vuepack = {
  namespaced: true,
  state: () => Store(sizes),
  mutations,
};

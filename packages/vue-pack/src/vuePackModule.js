import { Store, mutations } from "@matb85/base-pack";

export { Store };
export const vuepack = {
  namespaced: true,
  state: Store,
  mutations,
};

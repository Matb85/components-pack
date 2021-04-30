import { store } from "@matb85/base-pack";
const { Store, mutations } = store;

export { Store };
export const vuepack = {
  namespaced: true,
  state: new Store(),
  mutations,
};

import { store } from "@matb85/base-pack";
const { VuePackClass, mutations } = store;

export { VuePackClass };
export const vuepack = {
  namespaced: true,
  state: new VuePackClass(),
  mutations,
};

import { mixin } from "@matb85/base-pack";

export default {
  getHandler(imgEl, rootEl, GlobalConfig) {
    return mixin.mounted.bind({ ref: imgEl, el: rootEl, getDimensions: mixin.getDimensions, GlobalConfig });
  },
  close(imgEl, rootEl) {
    return mixin.close(imgEl, rootEl);
  },
};

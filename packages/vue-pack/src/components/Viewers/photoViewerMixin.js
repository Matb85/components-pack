import { mixin } from "@matb85/base-pack";

export default {
  getHandler(imgEl, rootEl) {
    return mixin.mounted.bind({ ref: imgEl, el: rootEl, getDimensions: mixin.getDimensions });
  },
  close(imgEl, rootEl) {
    return mixin.close(imgEl, rootEl);
  },
  getDimensions: mixin.getDimensions,
};

import { mixin } from "@matb85/base-pack";

export default {
  getHandler(imgEl, rootEl) {
    return mixin.mounted.bind({ ref: imgEl, el: rootEl, getdimensions: mixin.getdimensions });
  },
  close(imgEl, rootEl) {
    return mixin.close(imgEl, rootEl);
  },
  getdimensions: mixin.getdimensions,
};

import mixin from "./mixin";
import { Store, mutations } from "./store";
import photo from "./photo";
import maputil from "./map";

export { mixin, Store, mutations, photo, maputil };

type Size = string | number;
export interface StoreDataI {
  formats: Record<Size, string | RegExp>;
  enlarged: Array<Size>;
}

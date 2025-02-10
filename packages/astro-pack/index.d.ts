import type { GlobalConfigI, StoreI } from "@matb85/base-pack";

declare module 'virtual:@matb85/astro-pack' {
  export const GlobalConfig: GlobalConfigI;
}

declare global {
  interface Window {
    astroPack: StoreI;
  }
}
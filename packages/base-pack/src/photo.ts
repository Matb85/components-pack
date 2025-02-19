export interface BaseSizes extends Record<number, string | RegExp> {
  thumbnail: string | RegExp;
}

export type Sizes = Array<number> | Record<string | number, string | number>;

export default function (src: string, baseSizes: BaseSizes, sizes: Sizes) {
  let genSrcset = "";
  let genSizes = "";
  // example: [480, 1920, 2400, integer, integer ...]
  if (Array.isArray(sizes)) {
    for (let i = 0; i < sizes.length; i++) {
      const sizedSrc = src.replace(baseSizes.thumbnail, baseSizes[sizes[i]] as string);
      genSrcset += `${sizedSrc} ${sizes[i]}w, `;
    }
  } else {
    // example: {480: 363, 1920: 433, 2400: 1234, imgversion: sizetopick, ... }
    const keys = Object.keys(sizes);
    for (let i = 0; i < keys.length; i++) {
      const curSize = keys[i] as keyof BaseSizes; //current size
      const sizedSrc = src.replace(baseSizes.thumbnail, baseSizes[curSize] as string);
      genSrcset += `${sizedSrc} ${keys[i]}w, `;
      if (i < keys.length - 1) genSizes += `(max-width: ${sizes[curSize]}px) ${curSize}px, `;
    }
    genSizes += "100vw";
  }
  return { genSrcset, genSizes };
}

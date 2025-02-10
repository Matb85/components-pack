import path from "node:path";
import fs from "node:fs";
import type { Plugin } from "vite";
import type { GlobalConfigI } from "@matb85/base-pack";
import type { AstroIntegration } from "astro";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VIRTUAL_PREFIX = "/@virtual:@matb85/astro-pack/";

const MODULE_NAME = "virtual:@matb85/astro-pack";

function sanitizeConfig(config: GlobalConfigI): string {
  if (!config)
    throw new Error("GlobalConfig is required");
  if (!config.enlarged)
    throw new Error("GlobalConfig.enlarged is required");
  if (!config.formats)
    throw new Error("GlobalConfig.formats is required");

  // create copy of formats
  const formats = {...config.formats};
  for (const format in formats) {
    // if regex, covert to string
    if (formats[format] instanceof RegExp)
      formats[format] = "%%regex%%" + formats[format].source + "%%regex%%";

    if (typeof formats[format] !== "string")
      throw new Error("GlobalConfig.formats must be a Record of strings or regexes");
  }

  const str = JSON.stringify({ enlarged: config.enlarged, formats });
  return str.replace('"%%regex%%', "/").replace('%%regex%%"', "/");
}

function virtual(config: GlobalConfigI): Plugin {
  const resolvedIds = new Map<string, string>();

  resolvedIds.set(path.resolve(MODULE_NAME), MODULE_NAME);

  const plugin = {
    name: "vite-plugin-virtual",
    enforce: "pre",
    resolveId(id: string, importer: string) {
      if (id === MODULE_NAME)
        return VIRTUAL_PREFIX + id;

      if (importer) {
        const importerNoPrefix = importer.startsWith(VIRTUAL_PREFIX)
          ? importer.slice(VIRTUAL_PREFIX.length)
          : importer;
        const resolved = path.resolve(path.dirname(importerNoPrefix), id);
        if (resolvedIds.has(resolved))
          return VIRTUAL_PREFIX + resolved;
      }
      return null;
    },
    load(id: string) {
      if (id.startsWith(VIRTUAL_PREFIX)) {
        const idNoPrefix = id.slice(VIRTUAL_PREFIX.length);
        const resolvedId = idNoPrefix === MODULE_NAME ? idNoPrefix : resolvedIds.get(idNoPrefix);
        if (resolvedId) {
          sanitizeConfig(config);
          return `export const GlobalConfig = ${sanitizeConfig(config)}`;
        }
      }
      return null;
    },
  };
  return plugin as Plugin;
}

export function astroPack(module: GlobalConfigI): AstroIntegration {
  return {
    name: "@matb85/astro-pack",
    hooks: {
      "astro:config:setup": ({ updateConfig, injectScript }) => {
        injectScript('page', fs.readFileSync(path.resolve(__dirname, "bootstrap.js"), "utf-8"));
        updateConfig({ vite: { plugins: [virtual(module)] } });
      },
    },
  };
}
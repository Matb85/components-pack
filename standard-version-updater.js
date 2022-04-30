const stringifyPackage = require("stringify-package");
const detectIndent = require("detect-indent");
const detectNewline = require("detect-newline");

module.exports.readVersion = function (contents) {
  return JSON.parse(contents).version;
};

module.exports.writeVersion = function (contents, version) {
  const json = JSON.parse(contents);
  let indent = detectIndent(contents).indent;
  let newline = detectNewline(contents);
  console.log(json);
  json.version = version;
  json.dependencies["@matb85/base-pack"] = "workspace:^" + version;
  return stringifyPackage(json, indent, newline);
};

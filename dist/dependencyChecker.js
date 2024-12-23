"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/dependencyChecker.ts
var dependencyChecker_exports = {};
__export(dependencyChecker_exports, {
  checkDependencies: () => checkDependencies,
  getPackageJson: () => getPackageJson
});
module.exports = __toCommonJS(dependencyChecker_exports);
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var import_semver = __toESM(require("semver"));
var import_axios = __toESM(require("axios"));
var import_chalk = __toESM(require("chalk"));
var getPackageJson = () => {
  const filePath = path.resolve(process.cwd(), "package.json");
  if (!fs.existsSync(filePath)) {
    throw new Error("Arquivo package.json n\xE3o encontrado no diret\xF3rio atual.");
  }
  const packageData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(packageData);
};
var checkDependencies = (dependencies) => __async(void 0, null, function* () {
  console.log(import_chalk.default.blue("\u{1F50D} Verificando depend\xEAncias...\n"));
  const promises = Object.entries(dependencies).map((_0) => __async(void 0, [_0], function* ([pkg, currentVersion]) {
    try {
      const { data } = yield import_axios.default.get(`https://registry.npmjs.org/${pkg}/latest`);
      const latestVersion = data.version;
      if (import_semver.default.lt(currentVersion.replace("^", ""), latestVersion)) {
        console.log(import_chalk.default.yellow(`${pkg}: Atualize ${currentVersion} -> ${import_chalk.default.green(latestVersion)}`));
      } else {
        console.log(import_chalk.default.green(`${pkg}: J\xE1 est\xE1 atualizado (${currentVersion})`));
      }
    } catch (error) {
      console.log(import_chalk.default.red(`Erro ao verificar ${pkg}: ${error.message}`));
    }
  }));
  yield Promise.all(promises);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkDependencies,
  getPackageJson
});

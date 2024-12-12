"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDependencies = exports.getPackageJson = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const semver_1 = __importDefault(require("semver"));
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const getPackageJson = () => {
    const filePath = path.resolve(process.cwd(), 'package.json');
    if (!fs.existsSync(filePath)) {
        throw new Error('Arquivo package.json não encontrado no diretório atual.');
    }
    const packageData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(packageData);
};
exports.getPackageJson = getPackageJson;
const checkDependencies = (dependencies) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.blue('🔍 Verificando dependências...\n'));
    for (const [pkg, currentVersion] of Object.entries(dependencies)) {
        try {
            const { data } = yield axios_1.default.get(`https://registry.npmjs.org/${pkg}/latest`);
            const latestVersion = data.version;
            if (semver_1.default.lt(currentVersion.replace('^', ''), latestVersion)) {
                console.log(chalk_1.default.yellow(`${pkg}: Atualize ${currentVersion} -> ${chalk_1.default.green(latestVersion)}`));
            }
            else {
                console.log(chalk_1.default.green(`${pkg}: Já está atualizado (${currentVersion})`));
            }
        }
        catch (error) {
            console.log(chalk_1.default.red(`Erro ao verificar ${pkg}: ${error.message}`));
        }
    }
});
exports.checkDependencies = checkDependencies;

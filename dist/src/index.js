"use strict";
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
const dependencyChecker_1 = require("./dependencyChecker");
const dependencyChecker_2 = require("./dependencyChecker");
const chalk_1 = __importDefault(require("chalk"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packageJson = (0, dependencyChecker_1.getPackageJson)();
        console.log('\n📦 Gerenciador de Dependências\n');
        if (packageJson.dependencies) {
            console.log(chalk_1.default.bold('Dependências:'));
            yield (0, dependencyChecker_2.checkDependencies)(packageJson.dependencies);
        }
        if (packageJson.devDependencies) {
            console.log(chalk_1.default.bold('\nDependências de Desenvolvimento:'));
            yield (0, dependencyChecker_2.checkDependencies)(packageJson.devDependencies);
        }
        console.log(chalk_1.default.blue('\n✅ Verificação concluída!'));
    }
    catch (error) {
        console.error(chalk_1.default.red(`Erro: ${error.message}`));
    }
}))();

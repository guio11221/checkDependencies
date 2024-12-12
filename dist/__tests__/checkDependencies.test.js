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
const axios_1 = __importDefault(require("axios"));
const dependencyChecker_1 = require("../src/dependencyChecker");
jest.mock('axios');
describe('checkDependencies', () => {
    it('deve verificar dependências e identificar atualizações necessárias', () => __awaiter(void 0, void 0, void 0, function* () {
        const dependencies = { axios: '^0.21.1' };
        axios_1.default.get.mockResolvedValue({
            data: { version: '1.0.0' },
        });
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        yield (0, dependencyChecker_1.checkDependencies)(dependencies);
        expect(axios_1.default.get).toHaveBeenCalledWith('https://registry.npmjs.org/axios/latest');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Atualize ^0.21.1 -> 1.0.0'));
        consoleSpy.mockRestore();
    }));
    it('deve identificar dependências já atualizadas', () => __awaiter(void 0, void 0, void 0, function* () {
        const dependencies = { axios: '^1.0.0' };
        axios_1.default.get.mockResolvedValue({
            data: { version: '1.0.0' },
        });
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        yield (0, dependencyChecker_1.checkDependencies)(dependencies);
        expect(axios_1.default.get).toHaveBeenCalledWith('https://registry.npmjs.org/axios/latest');
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Já está atualizado'));
        consoleSpy.mockRestore();
    }));
    it('deve lidar com erros ao verificar uma dependência', () => __awaiter(void 0, void 0, void 0, function* () {
        const dependencies = { axios: '^0.21.1' };
        axios_1.default.get.mockRejectedValue(new Error('Erro de rede'));
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        yield (0, dependencyChecker_1.checkDependencies)(dependencies);
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Erro ao verificar axios:'));
        consoleSpy.mockRestore();
    }));
});

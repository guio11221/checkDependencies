import axios from 'axios';
import semver from 'semver';
import { checkDependencies } from '../src/dependencyChecker';

jest.mock('axios');

describe('checkDependencies', () => {
  it('deve verificar dependências e identificar atualizações necessárias', async () => {
    const dependencies = { axios: '^0.21.1' };

    (axios.get as jest.Mock).mockResolvedValue({
      data: { version: '1.0.0' },
    });

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await checkDependencies(dependencies);

    expect(axios.get).toHaveBeenCalledWith('https://registry.npmjs.org/axios/latest');
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Atualize ^0.21.1 -> 1.0.0'));

    consoleSpy.mockRestore();
  });

  it('deve identificar dependências já atualizadas', async () => {
    const dependencies = { axios: '^1.0.0' };

    (axios.get as jest.Mock).mockResolvedValue({
      data: { version: '1.0.0' },
    });

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await checkDependencies(dependencies);

    expect(axios.get).toHaveBeenCalledWith('https://registry.npmjs.org/axios/latest');
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Já está atualizado'));

    consoleSpy.mockRestore();
  });

  it('deve lidar com erros ao verificar uma dependência', async () => {
    const dependencies = { axios: '^0.21.1' };

    (axios.get as jest.Mock).mockRejectedValue(new Error('Erro de rede'));

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await checkDependencies(dependencies);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Erro ao verificar axios:'));

    consoleSpy.mockRestore();
  });
});

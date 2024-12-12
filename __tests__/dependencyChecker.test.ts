import * as fs from 'fs';
import * as path from 'path';
import { getPackageJson } from '../src/dependencyChecker';

jest.mock('fs');

describe('getPackageJson', () => {
  const mockPackageJson = {
    name: 'test-project',
    version: '1.0.0',
    dependencies: {
      axios: '^0.21.1',
    },
  };

  it('deve retornar o conteúdo do package.json', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockPackageJson));

    const packageJson = getPackageJson();
    expect(packageJson).toEqual(mockPackageJson);
  });

  it('deve lançar erro se o package.json não for encontrado', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    expect(() => getPackageJson()).toThrow('Arquivo package.json não encontrado no diretório atual.');
  });
});

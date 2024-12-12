import * as fs from 'fs';
import * as path from 'path';
import semver from 'semver';
import axios from 'axios';
import chalk from 'chalk';


export const getPackageJson = (): any => {
  const filePath = path.resolve(process.cwd(), 'package.json');
  if (!fs.existsSync(filePath)) {
    throw new Error('Arquivo package.json não encontrado no diretório atual.');
  }
  const packageData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(packageData);
};

export const checkDependencies = async (dependencies: Record<string, string>) => {
    console.log(chalk.blue('🔍 Verificando dependências...\n'));
    for (const [pkg, currentVersion] of Object.entries(dependencies)) {
      try {
        const { data } = await axios.get(`https://registry.npmjs.org/${pkg}/latest`);
        const latestVersion = data.version;
  
        if (semver.lt(currentVersion.replace('^', ''), latestVersion)) {
          console.log(
            chalk.yellow(`${pkg}: Atualize ${currentVersion} -> ${chalk.green(latestVersion)}`)
          );
        } else {
          console.log(chalk.green(`${pkg}: Já está atualizado (${currentVersion})`));
        }
      } catch (error: any) {
        console.log(chalk.red(`Erro ao verificar ${pkg}: ${error.message}`));
      }
    }
  };
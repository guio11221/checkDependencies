import { getPackageJson } from './dependencyChecker';
import { checkDependencies } from './dependencyChecker';
import chalk from 'chalk';

(async () => {
  try {
    const packageJson = getPackageJson();
    console.log('\n📦 Gerenciador de Dependências\n');
    
    if (packageJson.dependencies) {
      console.log(chalk.bold('Dependências:'));
      await checkDependencies(packageJson.dependencies);
    }

    if (packageJson.devDependencies) {
      console.log(chalk.bold('\nDependências de Desenvolvimento:'));
      await checkDependencies(packageJson.devDependencies);
    }

    console.log(chalk.blue('\n✅ Verificação concluída!'));
  } catch (error: any) {
    console.error(chalk.red(`Erro: ${error.message}`));
  }
})();

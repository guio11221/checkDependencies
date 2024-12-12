const { getPackageJson, checkDependencies } = require('../dist/src/dependencyChecker');

const main = async () => {
  try {
    const packageJson = getPackageJson();
    const dependencies = packageJson.dependencies;

    if (!dependencies || Object.keys(dependencies).length === 0) {
      console.log('Não há dependências para verificar.');
      return;
    }

    await checkDependencies(dependencies);
  } catch (error) {
    console.error('Erro ao executar o gerenciador de dependências:', error.message);
  }
};

main();

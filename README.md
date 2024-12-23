# Check Dependencies

Este módulo permite verificar se as dependências de um projeto Node.js estão atualizadas. Ele compara as versões atuais das dependências com as versões mais recentes disponíveis no npm, informando se há atualizações disponíveis.

## Instalação

Para instalar este módulo em seu projeto, use o seguinte comando:

```bash
npm install check-dependencies
```
Ou, se você preferir usar yarn:

```bash
yarn add check-dependencies

```

## Como Usar

#### 1. Importar o módulo  

No seu código TypeScript ou JavaScript, importe as funções getPackageJson e checkDependencies:

```bash
import { getPackageJson, checkDependencies } from 'check-dependencies';
```

#### 2. Executar a verificação de dependências

Com as funções importadas, basta chamar getPackageJson() para obter as dependências do seu package.json e passar para a função checkDependencies(), que fará a verificação e exibirá os resultados no console.

Exemplo de uso:

```bash 
import { getPackageJson, checkDependencies } from 'check-dependencies';

(async () => {
  try {
    // Lê o package.json do diretório atual
    const packageJson = getPackageJson();
    
    // Verifica as dependências do package.json
    await checkDependencies(packageJson.dependencies);
  } catch (error) {
    console.error('Erro ao verificar dependências:', error.message);
  }
})();
```

## Funcionalidades

<li><i>getPackageJson():</i> Lê o arquivo package.json do diretório atual e retorna seu conteúdo como um objeto.</li>

<li><i>checkDependencies(dependencies)</i>: Recebe as dependências (como um objeto) e verifica se há versões mais recentes disponíveis no npm. A função usa axios para consultar a API do npm e semver para comparar as versões.</li>

#### Durante a execução, o módulo exibirá:

<li><i>Verde:</i> Se a dependência já estiver atualizada.</li>
<li><i>Amarelo:</i> Se houver uma versão mais recente disponível.</li>
<li><i>Vermelho:</i> Se houver um erro ao verificar uma dependência.</li>
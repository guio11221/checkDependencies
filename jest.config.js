module.exports =  {
  preset: 'ts-jest/presets/default-esm', // Certifique-se de usar o preset correto para ES Modules.
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Configuração de ts-jest movida para transform.
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^#ansi-styles$': 'ansi-styles', // Caso precise para resolver importações específicas.
  },
};
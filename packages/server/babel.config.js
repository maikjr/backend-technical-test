module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@entites': './src/entites',
        '@useCases': './src/useCases',
        '@repositories': './src/repositories'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}

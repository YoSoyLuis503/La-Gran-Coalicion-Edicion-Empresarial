const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/La-Gran-Coalicion-Edicion-Empresarial/'  // Cambia esto por el nombre de tu repositorio
    : '/'
})

<template>
  <div id="app">
    <RegistroEmpresarial />
  </div>

  <div id="otraapp">
    <LoginEmpresarial/>
  </div>

</template>

<script>
import RegistroEmpresarial from './components/RegistroEmpresarial.vue';
import LoginEmpresarial from './components/LoginEmpresarial.vue';

export default {
  name: 'App',
  components: {
    RegistroEmpresarial,
    LoginEmpresarial,
  },
};
</script>

<style>
/*Estilos globales*/
</style>

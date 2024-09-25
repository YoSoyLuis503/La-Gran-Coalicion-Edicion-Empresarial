<template>
    <div class="bodyLogin">
      <form class="container" @submit.prevent="handleSubmit">
        <div class="blue-ugb">Portal de Empresas</div>
        <img src="@/assets/logo_azul_vertical.png" alt="Logo de la empresa">
        <input
          type="text"
          class="item"
          placeholder="Carnet Empresarial"
          v-model="carnet"
          required
          autocomplete="on"
        />
        <input
          type="password"
          class="item"
          id="password-field"
          placeholder="Contraseña"
          v-model="password"
          required
          autocomplete="on"
        />
        <div class="toggle-button"></div>
        <input type="submit" class="button" value="INICIAR SESION" />
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        carnet: '',
        password: '',
      };
    },
    methods: {
      handleSubmit() {
        // Aquí puedes manejar el envío del formulario
        console.log('Carnet:', this.carnet);
        console.log('Contraseña:', this.password);
        // Aquí puedes agregar lógica para autenticar al usuario
      },
    },
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar tu CSS o importar el archivo CSS */
  @import '@/css/loginAndRegistroEmpresarial.css';
  </style>
  
<template>
    <header>
      <NavbarComponent />
    </header>
  
    <div class="container-fluid">
        <!-- Información de la empresa -->
        <div class="row">
          <PostJobHeader/>
        </div>
  
        <!-- Campos del formulario -->
        <div class="row mt-3">
          <PostJobTextInput/>
        </div>
  
        <div class="row">
          <PostJobTextTarea/>
        </div>
  
        <!-- Campos adicionales -->
        <div class="row mt-3">
          <PostJobSelect_Date/>
        </div>
  
        <!-- Botón para publicar -->
        <div class="row mt-3">
          <div class="col text-start">
            <button type="submit" class="btn btn-primary w-100">Publicar</button>
          </div>
        </div>
    </div>
  </template>
  
  <script setup>
  // import { ref } from 'vue';
  import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
  import PostJobHeader from '@/components/PostJob/PostJobHeader.vue';
  import PostJobTextInput from '@/components/PostJob/PostJobTextInput.vue';
  import PostJobTextTarea from '@/components/PostJob/PostJobTextTarea.vue';
  import PostJobSelect_Date from '@/components/PostJob/PostJobSelect_Date.vue';
  
  // Datos del formulario de empleo
  // const jobData = ref({
  //   position: '',
  //   duration: '',
  //   description: '',
  //   location: '',
  //   salary: '',
  //   modalidad: '',
  //   tipo: '',
  //   vacantes: '',
  //   fechaInicio: ''
  // });
  
  // Estado para mostrar/ocultar el tooltip

  </script>
  
  <style scoped>
  .tooltip-text {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    margin-top: 5px;
    z-index: 1;
    width: 100%;
    text-align: center;
  }
  </style>
  
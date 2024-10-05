<template>
    <header>
      <NavbarComponent />
    </header>
  
    <div class="container-fluid">
      <form @submit.prevent="submitForm">
        <div class="row">
          <h1>Publicar Empleo</h1>
        </div>
  
        <!-- Información de la empresa -->
        <div class="row">
          <div class="col">
            <img :src="company_user_data.icon" alt="Company Logo" class="img-fluid">
          </div>
          <div class="col">
            <div class="text-start">
              <label>{{ company_user_data.name }}</label>
            </div>
            <div class="text-start mt-2">
              <label>{{ company_user_data.email }}</label>
            </div>
            <div class="text-start mt-2">
              <label>{{ company_user_data.tel }}</label>
            </div>
          </div>
        </div>
  
        <!-- Campos del formulario -->
        <div class="row mt-3">
          <div class="col text-start">
            <input v-model="jobData.position" type="text" class="form-control" placeholder="Nombre del puesto" required>
          </div>
          <div class="col text-start">
            <input v-model="jobData.duration" type="text" class="form-control" placeholder="Duración (opcional)">
          </div>
        </div>
  
        <div class="row mt-3">
          <div class="col text-start">
            <textarea v-model="jobData.description" class="form-control" rows="3" placeholder="Descripción" required></textarea>
          </div>
        </div>
  
        <div class="row mt-3">
          <div class="col text-start">
            <input v-model="jobData.location" type="text" class="form-control" placeholder="Lugar de trabajo" required>
          </div>
          <div class="col text-start">
            <input v-model="jobData.salary" type="text" class="form-control" placeholder="Salario (Obligatorio)" required>
          </div>
        </div>
  
        <!-- Campos adicionales -->
        <div class="row mt-3">
          <div class="col text-start">
            <select v-model="jobData.modalidad" class="form-select" required>
              <option disabled value="">Modalidad de empleo</option>
              <option>Presencial</option>
              <option>Remoto</option>
              <option>Híbrido</option>
            </select>
          </div>
          <div class="col text-start">
            <select v-model="jobData.tipo" class="form-select" required>
              <option disabled value="">Tipo de empleo</option>
              <option>Tiempo completo</option>
              <option>Medio tiempo</option>
              <option>Freelance</option>
            </select>
          </div>
        </div>
  
        <div class="row mt-3">
          <div class="col text-start">
            <select v-model="jobData.vacantes" class="form-select" required>
              <option disabled value="">Vacantes disponibles</option>
              <option v-for="i in 10" :key="i">{{ i }}</option>
            </select>
          </div>
          <div class="col text-start position-relative">
            <!-- Input de fecha con evento hover para mostrar aviso -->
            <input v-model="jobData.fechaInicio" type="date" class="form-control" @mouseover="showTooltip = true" @mouseleave="showTooltip = false" required>
            
            <!-- Aviso que se muestra al colocar el cursor sobre el input -->
            <div v-if="showTooltip" class="tooltip-text">
              Selecciona la fecha de inicio
            </div>
          </div>
        </div>
  
        <!-- Botón para publicar -->
        <div class="row mt-3">
          <div class="col text-start">
            <button type="submit" class="btn btn-primary w-100">Publicar</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
  
  // Datos de la empresa
  const company_user_data = ref({
    icon: require('@/assets/logo.png'),
    name: "Vue",
    email: "vue@vue.com",
    tel: "+1 7676-8090"
  });
  
  // Datos del formulario de empleo
  const jobData = ref({
    position: '',
    duration: '',
    description: '',
    location: '',
    salary: '',
    modalidad: '',
    tipo: '',
    vacantes: '',
    fechaInicio: ''
  });
  
  // Estado para mostrar/ocultar el tooltip
  const showTooltip = ref(false);
  
  // Función para manejar el envío del formulario
  const submitForm = () => {
    console.log('Datos del formulario:', jobData.value);
    // Aquí puedes manejar el envío de datos, por ejemplo, enviarlos a un servidor.
  };
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
  
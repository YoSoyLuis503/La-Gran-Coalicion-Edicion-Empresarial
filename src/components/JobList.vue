<template>
    <section class="featured-job-area feature-padding min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div class="container h-100 d-flex flex-column justify-content-center">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-tittle text-center mb-5">
              <h2>Empleos publicados</h2>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div v-for="(job, index) in jobs" :key="index" class="col-xl-10 col-lg-10 col-md-10 col-sm-12 mb-4 d-flex justify-content-center">
            <JobItem :job="job" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import JobItem from './JobItem.vue';
  import { defineProps } from 'vue';
  
  // Definir las propiedades del componente
  const props = defineProps({
    jobs: {
      type: Array,
      required: true
    }
  });
  props.value
  </script>
  
  <style scoped>
  .featured-job-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center; /* Asegura que el texto esté centrado */
  }
  
  .section-tittle h2 {
    font-size: 2.5rem;
    color: #0c0c0c;
  }
  
  .row {
    width: 100%;
  }
  
  .col-xl-10, .col-lg-10, .col-md-10, .col-sm-12 {
    display: flex;
    justify-content: center;
  }
  
  .container {
    max-width: 1200px;
  }
  
  .min-vh-100 {
    min-height: 100vh;
  }
  </style>
  
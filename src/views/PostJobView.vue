<template>
  <header>
    <NavbarComponent />
  </header>

  <div class="container-fluid">
    <!-- Información de la empresa -->
    <div class="row">
      <PostJobHeader />
    </div>

    <!-- Campos del formulario -->
    <div class="row mt-3">
      <!-- Usamos v-for para iterar sobre los inputs -->
      <div class="col-6" v-for="(input, index) in textInputs" :key="index">
        <PostJobTextInput :placeholder="input.placeholder" :type="input.type" v-model="input.model" :required="input.required" />
      </div>
    </div>

    <div class="row">
      <PostJobTextTarea />
    </div>

    <!-- Campos adicionales -->
    <div class="row mt-3">
      <!-- Usamos v-for para iterar sobre los select components -->
      <div class="col-6 text-start" v-for="(select, index) in selectOptions" :key="index">
        <SelectComponent v-model="select.model" :options="select.options" :placeholder="select.placeholder" />
      </div>
    </div>

    <!-- Botón para publicar -->
    <div class="row mt-3 mb-5">
      <div class="col text-start">
        <button type="submit" class="btn btn-primary w-100">Publicar</button>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script setup>
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import PostJobHeader from '@/components/PostJob/PostJobHeader.vue';
import PostJobTextInput from '@/components/InputComponent.vue';
import PostJobTextTarea from '@/components/PostJob/PostJobTextTarea.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import { ref } from 'vue';

// Datos de los inputs de texto
const name = ref('');
const time = ref('');
const place = ref('');
const salarie = ref('');

// Array para los campos de texto con su configuración
const textInputs = [
  { placeholder: 'Nombre del puesto', type: 'text', model: name, required: true },
  { placeholder: 'Duración', type: 'text', model: time, required: true },
  { placeholder: 'Lugar de trabajo', type: 'text', model: place, required: true },
  { placeholder: 'Salario', type: 'text', model: salarie, required: true },
];

// Datos de los selects
const modoEmpleo = ref('');
const tipoEmpleo = ref('');

// Opciones para los selects
const modalidades = [
  { value: 'Presencial', text: 'Presencial' },
  { value: 'Remoto', text: 'Remoto' },
  { value: 'Híbrido', text: 'Híbrido' }
];

const tipos = [
  { value: 'Tiempo Completo', text: 'Tiempo Completo' },
  { value: 'Medio Tiempo', text: 'Medio Tiempo' },
  { value: 'Freelance', text: 'Freelance' }
];

// Array para los selects con su configuración
const selectOptions = [
  { model: modoEmpleo, options: modalidades, placeholder: 'Modalidad de empleo' },
  { model: tipoEmpleo, options: tipos, placeholder: 'Tipo de empleo' },
];
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

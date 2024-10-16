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
      <PostJobTextInput />
    </div>

    <div class="row">
      <PostJobTextTarea />
    </div>

    <!-- Campos adicionales -->
    <div class="row mt-3">
      <div class="col-6 text-start">
        <SelectComponent v-model="modoEmpleo" :options="modalidades" placeholder="Modalidad de empleo" />
      </div>
      <div class="col-6 text-start">
        <SelectComponent v-model="tipoEmpleo" :options="tipos" placeholder="Tipo de empleo" />
      </div>
      <div class="col-6 text-start">

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
import PostJobTextInput from '@/components/PostJob/PostJobTextInput.vue';
import PostJobTextTarea from '@/components/PostJob/PostJobTextTarea.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import { ref } from 'vue';
const modoEmpleo = ref('');
const modalidades = [
  { value: 'Presencial', text: 'Presencial' },
  { value: 'Remoto', text: 'Remoto' },
  { value: 'Híbrido', text: 'Híbrido' }
];

const tipoEmpleo = ref('');
const tipos = [
  { value: 'Tiempo Completo', text: 'Tiempo Completo' },
  { value: 'Medio Tiempo', text: 'Medio Tiempo' },
  { value: 'Freelance', text: 'Freelance' }
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
<template>
  <header>
    <NavbarComponent />
  </header>

  <div class="container-fluid">
    <form @submit.prevent="submitForm">
      <PostJobHeader />

      <!-- Campos del formulario -->
      <div class="row mt-3">
        <PostJobTextInput />
      </div>

      <div class="row mt-3">
        <div class="col text-start">
          <textarea class="form-control" rows="3" placeholder="Descripción" required></textarea>
        </div>
      </div>

      <div class="row mt-3">
        <Selecet_Date />
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
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import PostJobHeader from '@/components/PostJob/PostJobHeader.vue';
import PostJobTextInput from '@/components/PostJob/PostJobTextInput.vue';
import Selecet_Date from '@/components/PostJob/Selecet_Date.vue';
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

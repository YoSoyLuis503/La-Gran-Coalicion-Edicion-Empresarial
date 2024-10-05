<template>
    <div class="col-6" v-for="(text, index) in texts" :key="index">
        <input type="text" class="form-control" :placeholder="text" required>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let texts = ref(["Nombre del puesto", "Duración", "Lugar de trabajo", "Salario"]);

</script>


<style scoped></style>
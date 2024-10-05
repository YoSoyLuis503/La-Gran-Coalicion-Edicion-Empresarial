<template>
    <div class="col-6 text-start" v-for="(text, index) in texts" :key="index">
        <input :placeholder="text" required class="form-control"><br>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let texts = ref(["Nombre del puesto", "Duración", "Lugar de trabajo", "Salario"]);

</script>

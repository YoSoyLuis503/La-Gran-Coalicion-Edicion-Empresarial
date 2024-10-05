<template>
    <div class="col-6 text-start" v-for="(x) in 3" :key="x">
        <select class="form-select" required>
            <option disabled value="">Modalidad de empleo</option>
            <option>Presencial</option>
            <option>Remoto</option>
            <option>Híbrido</option>
        </select><br>
    </div>
    <!-- <div class="col text-start">
        <select v-model="jobData.tipo" class="form-select" required>
            <option disabled value="">Tipo de empleo</option>
            <option>Tiempo completo</option>
            <option>Medio tiempo</option>
            <option>Freelance</option>
        </select>
    </div> -->
    <!-- <div class="col text-start">
        <select v-model="jobData.vacantes" class="form-select" required>
            <option disabled value="">Vacantes disponibles</option>
            <option v-for="i in 10" :key="i">{{ i }}</option>
        </select>
    </div> -->

    <div class="col-6 text-start position-relative">
        <!-- Input de fecha con evento hover para mostrar aviso -->
        <input type="date" class="form-control" @mouseover="showTooltip = true" @mouseleave="showTooltip = false" required>

        <!-- Aviso que se muestra al colocar el cursor sobre el input -->
        <div v-if="showTooltip" class="tooltip-text">
            Selecciona la fecha de inicio
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const showTooltip = ref(false);
</script>

<style scoped></style>
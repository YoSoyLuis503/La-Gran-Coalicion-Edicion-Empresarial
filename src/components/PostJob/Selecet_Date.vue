<template>
    <div class="col-6 text-start" v-for="(x) in 4" :key=x>
        <select class="form-select" required>
            <option disabled value="">Modalidad de empleo</option>
            <option>Presencial</option>
            <option>Remoto</option>
            <option>Híbrido</option>
        </select>
    </div>
    <!-- <select v-model="jobData.vacantes" class="form-select" required>
        <option disabled value="">Vacantes disponibles</option>
        <option v-for="i in 10" :key="i">{{ i }}</option>
    </select> -->
</template>

<script setup>
// import { ref } from 'vue';
// // Estado para mostrar/ocultar el tooltip
// const showTooltip = ref(false);

</script>

<style scoped></style>
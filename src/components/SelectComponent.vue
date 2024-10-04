<template>
    <div class="d-flex justify-content-between align-items-center">
        <select class="form-select" v-model="orderby">
            <option >Más Reciente</option>
            <option >Más Antiguo</option>
            <option >Nombre (A-Z)</option>
            <option >Nombre (Z-A)</option>
            <option >Edad (M-m)</option>
            <option >Edad (m-M)</option>
        </select>
    </div>
</template>

<script setup>
import {ref} from 'vue';
let  orderby = ref('Nombre (A-Z)')

</script>

<style scoped></style>
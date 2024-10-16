<template>
    <h1>Publicar Empleo</h1>
    <div class="col">
        <img :src="company_user_data.icon" alt="Company Logo" class="img-fluid" style="max-width: 115px;">
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
</template>

<script setup>
import { ref } from 'vue';
// Datos de la empresa
const company_user_data = ref({
    icon: require('@/assets/img/logoTA.png'),
    name: "Vue",
    email: "vue@vue.com",
    tel: "+1 7676-8090"
});
</script>

<style scoped></style>
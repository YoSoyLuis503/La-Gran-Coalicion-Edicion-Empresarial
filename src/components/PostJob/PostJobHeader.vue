<template>
    <div class="row">
        <h1>Publicar Empleo</h1>
    </div>
    <div class="row">
        <div class="col-5">
            <img :src="company_user_data.icon" class="img-fluid">
        </div>
        <div class="col-7">
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
    </div>
</template>

<script setup>
import {ref} from 'vue';
let company_user_data = ref({
    icon: require('@/assets/logo.png'),
    name: "Vue",
    email: "vue@vue.com",
    tel: "+1 7676-8090"
});


</script>

<style scoped></style>
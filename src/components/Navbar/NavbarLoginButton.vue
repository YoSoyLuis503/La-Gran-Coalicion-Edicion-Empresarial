<template>
    <router-link :to="{ name: 'login' }" class="btn btn-Login">Login</router-link>

</template>

<script setup>

</script>

<style scoped>
.btn-Login {
    border-color: #011B40;
    border-radius: 0%;
    padding: 10px;
    width: 150px;
    background-color: #ffffff;
    color: #011B40;
    border: 2px solid #011B40;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-Login:hover {
    background-color: #2BBBAD;
    color: #ffffff;
}
</style>
<template>
    <router-link :to="{name: 'register'}" class="btn btn-Registrarse me-2">Registrarse</router-link>
</template>

<script setup>

</script>

<style scoped>
.btn-Registrarse {
    border-radius: 0%;
    padding: 10px;
    width: 150px;
    background-color: #011B40;
    color: #ffff;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-Registrarse:hover {
    background-color: #0b17c5ed;
    color: #ffffff;
}
</style>
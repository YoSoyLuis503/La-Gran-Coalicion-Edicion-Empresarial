<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link :to="{name:'Home'}">
                <img src="../../assets/img/logoTA.png" alt="Logo" height="50">
            </router-link>    
            <!-- Botón de alternancia para la vista móvil
            Este botón se muestra en dispositivos móviles y colapsa/expande el menú de navegación -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span> <!-- Icono del botón de alternancia -->
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <NavbarRoutes />
            </div>
            <div class="d-flex">
                <SignOut/>
            </div>
        </div>
    </nav>
</template>

<script setup>
import NavbarRoutes from './NavbarRoutes.vue';
import SignOut from './SignOut.vue';

</script>


<style></style>
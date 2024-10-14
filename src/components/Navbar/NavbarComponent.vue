<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../../assets/img/logoTA.png" alt="Logo" height="50">
            </a>
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
                <NavbarRegisterButton />
                <NavbarLoginButton />
            </div>
        </div>
    </nav>
</template>

<script setup>
import NavbarRoutes from './NavbarRoutes.vue';
import NavbarRegisterButton from './NavbarRegisterButton.vue';
import NavbarLoginButton from './NavbarLoginButton.vue';

</script>


<style></style>
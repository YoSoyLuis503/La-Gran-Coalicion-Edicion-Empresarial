<template>
    <header>
        <NavbarComponent />
    </header>

    <!-- Título principal -->
    <div class="container-fluid text-center my-5">
        <div class="row big-background-image">
            <h1 class="display-4 font-weight-bold text-primary">Busca el equipo de tus sueños</h1>
            <p class="lead text-muted">Encuentra el mejor equipo para ti.</p>
        </div>
        <div class="row">
            <FacultyList :faculties="faculties" />
        </div>
        <div class="row">
            <JobList :jobs="jobs" />
        </div>
    </div>
    <FooterComponent />
</template>

<script setup>
import { ref } from 'vue';
import FacultyList from '@/components/FacultyList.vue';
import JobList from '@/components/JobList.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
// // Definir los trabajos
const jobs = ref([
    { title: "UX Designer", company: "Anonimo", location: "El Salvador, San Miguel", salary: "$150 - $300", type: "Tiempo completo", time: " Hace 7 horas"},
    { title: "Beta Tester", company: "Team Cherry", location: "La Unión", salary: "$1000-1500", type: "Tiempo Completo", time: " Hace 1 hora"},
    { title: "UX Designer", company: "Anonimo", location: "El Salvador, San Miguel", salary: "$150 - $300", type: "Tiempo completo", time: " Hace 7 horas"}


]);
</script>

<style scoped>
.big-background-image {
    background-image: url('@/assets/img/R.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
}

h1 {
    font-size: 4rem;
    color: black !important;
}


p {
    font-size: 1.5rem;
}
</style>

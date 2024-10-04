<template>
    <div>
        <!-- Título principal -->
        <div class="home-container text-center my-5">
            <h1 class="display-4 font-weight-bold text-primary">Busca el equipo de tus sueños</h1>
            <p class="lead text-muted">Encuentra el mejor equipo para ti.</p>
        </div>

        <!-- Facultad -->
        <FacultyList :faculties="faculties" />

        <!-- Empleos -->
        <JobList :jobs="jobs" />

        <!-- Footer -->
        <FooterComponent />
    </div>
</template>

<script>
import FacultyList from './FacultyList.vue';
import JobList from './JobList.vue';
import FooterComponent from './FooterComponent.vue'; // Importa el componente del footer

export default {
    name: "HomeEmpresa",
    components: {
        FacultyList,
        JobList,
        FooterComponent // Añade el componente de Footer
    },
    data() {
        return {
            faculties: [
                { name: "Ciencias y Humanidades", count: 653, icon: "flaticon-tour", description: "Explora áreas de arte, filosofía y más." },
                { name: "Ciencias de la Salud", count: 658, icon: "flaticon-cms", description: "Forma parte de las profesiones de la salud." },
                { name: "Ingeniería y Arquitectura", count: 658, icon: "flaticon-report", description: "Construye el futuro con nuestras ingenierías." },
                { name: "Derecho y R. Internacionales", count: 658, icon: "flaticon-app", description: "Desarrolla tu carrera en leyes y relaciones." },
                { name: "Ingeniería en Sistemas", count: 658, icon: "flaticon-helmet", description: "Impulsa tu futuro en la tecnología." },
                { name: "Ciencias y Tecnología", count: 658, icon: "flaticon-high-tech", description: "Innova en un mundo tecnológico." },
                { name: "Postgrado", count: 658, icon: "flaticon-real-estate", description: "Amplía tus horizontes académicos." },
                { name: "Otros", count: 658, icon: "flaticon-content", description: "Descubre diversas oportunidades." },
            ],
            jobs: [
                { title: "UX Designer", company: "Anonimo", location: "El Salvador, San Miguel", salary: "$150 - $300", type: "Tiempo completo", time: "Hace 7 horas", img: "src/assets/img/prueba.png" },
            ]
        };
    }
};
</script>

<style scoped>
.home-container {
    background-image: url('@/assets/img/HEmpresa1.jpg');
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
}

p {
    font-size: 1.5rem;
}
</style>

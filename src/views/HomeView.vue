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
        <div class="row mt-5">
            <h2 class="section-title">Empleos publicados</h2>
            <JobList :jobs="jobs" />
        </div>
    </div>
    <FooterComponent />
</template>

<script setup>
import FacultyList from '@/components/FacultyList.vue';
import JobList from '@/components/JobItem.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import { ref, onMounted } from 'vue';
import { db } from '@/js/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Definir una referencia reactiva para almacenar los empleos
const jobs = ref([]);

// Función para obtener los datos de la colección "Empleo"
const getJobs = async () => {
  try {
    // Obtener los documentos de la colección "Empleo"
    const querySnapshot = await getDocs(collection(db, 'Empleo'));

    // Recorrer cada documento y añadirlo al array jobs
    querySnapshot.forEach((doc) => {
      jobs.value.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error al obtener los empleos: ", error);
  }
};

// Llamar a getJobs cuando el componente se monte
onMounted(() => {
  getJobs();
});
</script>

<style scoped>
.section-tittle h2 {
    font-size: 2.5rem;
    color: #0c0c0c;
}

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

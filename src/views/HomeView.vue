<template>
  <header>
      <NavbarComponent />
  </header>

  <!-- Título principal -->
  <div class="container-fluid text-center my-5">
      <div class="row big-background-image">
          <h1 class="display-4 font-weight-bold text-primary">Bienvenido, busca el equipo de tus sueños</h1>
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
import JobList from '@/components/JobItem.vue'; // Cambiado para asegurar el nombre correcto
import FooterComponent from '@/components/FooterComponent.vue';
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import { ref, onMounted } from 'vue';
import { db, auth } from '@/js/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Definir una referencia reactiva para almacenar los empleos
const jobs = ref([]);

// Función para obtener los empleos publicados solo por la empresa autenticada
const getJobs = async (userId) => {
  jobs.value = []; // Reiniciar el array antes de agregar nuevos datos
  try {
    const querySnapshot = await getDocs(collection(db, 'empleos'));
    
    // Filtrar los empleos que pertenecen a la empresa autenticada usando el campo 'uid'
    querySnapshot.forEach((doc) => {
      const jobData = doc.data();
      if (jobData.uid === userId) { // Verificar si el campo 'uid' coincide con el uid del usuario autenticado
        jobs.value.push({ id: doc.id, ...jobData });
      }
    });
  } catch (error) {
    console.error("Error al obtener los empleos: ", error);
  }
};

// Verificar si hay un usuario autenticado y obtener sus empleos
onMounted(() => {
  const user = auth.currentUser;
  if (user) {
    console.log("Usuario activo:", user.email);
    getJobs(user.uid); // Pasar el UID del usuario autenticado para filtrar empleos
  } else {
    console.log("No hay ningún usuario autenticado.");
  }
});
</script>

<style scoped>
.section-title {
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

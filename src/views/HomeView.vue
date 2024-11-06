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
          <!-- Agregar key única para forzar actualización en JobList -->
          <JobList :jobs="jobs" @delete-job="deleteJob" />
      </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import FacultyList from '@/components/FacultyList.vue';
import JobList from '@/components/JobItem.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import { ref, onMounted, watch } from 'vue';
import { db, auth } from '@/js/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const jobs = ref([]);

// Función para obtener los empleos publicados solo por la empresa autenticada
const getJobs = async (userId) => {
  const fetchedJobs = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'empleos'));
    querySnapshot.forEach((doc) => {
      const jobData = doc.data();
      if (jobData.uid === userId) {
        fetchedJobs.push({ id: doc.id, ...jobData });
      }
    });
    jobs.value = fetchedJobs;
  } catch (error) {
    console.error("Error al obtener los empleos: ", error);
  }
};

// Función para eliminar un empleo y actualizar la lista local
const deleteJob = async (jobId) => {
  try {
    await deleteDoc(doc(db, 'empleos', jobId));
    console.log("Empleo eliminado correctamente.");

    // Remover el empleo eliminado y forzar actualización de la lista
    jobs.value = jobs.value.filter(job => job.id !== jobId);
    jobs.value = [...jobs.value];
  } catch (error) {
    console.error("Error al eliminar el empleo: ", error);
  }
};

// Verificar si hay un usuario autenticado y obtener sus empleos
onMounted(() => {
  const user = auth.currentUser;
  if (user) {
    console.log("Usuario activo:", user.email);
    getJobs(user.uid);
  } else {
    console.log("No hay ningún usuario autenticado.");
  }
});

// Watch para monitorear cambios en jobs y verificar reactividad
watch(jobs, (newJobs) => {
  console.log("Cambio detectado en jobs:", newJobs);
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

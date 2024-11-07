<template>
  <header>
    <NavbarComponent />
  </header>

  <div class="container-fluid">
    <!-- Hero Section -->
    <section class="hero-section text-center d-flex flex-column align-items-center justify-content-center">
      <video class="background-video" src="@/assets/videos/fondo.mp4" autoplay loop muted playsinline></video>
      <h1 class="hero-title">Bienvenido, busca el equipo de tus sueños</h1>
      <p class="hero-subtitle">Encuentra el mejor equipo para ti.</p>
      <button class="btn btn-primary mt-4 rounded-button" @click="redirect">Publicar Un empleo</button>
    </section>

     <!-- Empleos Publicados -->
     <section class="jobs-section mt-5">
      <h2 class="section-title">Empleos publicados</h2>
      <!-- Pasa jobs y maneja el evento de eliminación -->
      <JobList :jobs="jobs" @delete-job="deleteJob" />
    </section>

    <div class="row">
      <FacultyList :faculties="faculties" />
    </div>

    <!-- Categorías de Empleo -->
    <section class="categories-section my-5 text-center">
      <h2 class="section-title">Explora categorías populares</h2>
      <div class="row mt-4">
        <div class="col-md-3">
          <div class="category-card">
            <i class="fas fa-laptop-code icon"></i>
            <h3>Desarrollo</h3>
          </div>
        </div>
        <div class="col-md-3">
          <div class="category-card">
            <i class="fas fa-chart-line icon"></i>
            <h3>Marketing</h3>
          </div>
        </div>
        <div class="col-md-3">
          <div class="category-card">
            <i class="fas fa-briefcase icon"></i>
            <h3>Negocios</h3>
          </div>
        </div>
        <div class="col-md-3">
          <div class="category-card">
            <i class="fas fa-paint-brush icon"></i>
            <h3>Diseño</h3>
          </div>
        </div>
      </div>
    </section>

  </div>

  <FooterComponent />
</template>

<script setup>
import FacultyList from '@/components/FacultyList.vue';
import JobList from '@/components/JobItem.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import { ref, onMounted } from 'vue';
import { db, auth } from '@/js/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
 
// Definir una referencia reactiva para almacenar los empleos
const jobs = ref([]);
const router = useRouter();

// Función para obtener los empleos publicados solo por la empresa autenticada
const getJobs = async (userId) => {
  jobs.value = []; // Reiniciar el array antes de agregar nuevos datos
  try {
    const querySnapshot = await getDocs(collection(db, 'empleos'));

    // Filtrar los empleos que pertenecen a la empresa autenticada usando el campo 'uid'
    querySnapshot.forEach((doc) => {
      const jobData = doc.data();
      if (jobData.uid === userId) {
        jobs.value.push({ id: doc.id, ...jobData });
      }
    });
  } catch (error) {
    console.error("Error al obtener los empleos: ", error);
  }
};

// Función para manejar la eliminación de un empleo y actualizar la lista de empleos
const deleteJob = async (jobId) => {
  try {
    await deleteDoc(doc(db, 'empleos', jobId)); // Eliminar de Firestore
    jobs.value = jobs.value.filter(job => job.id !== jobId); // Eliminar de la lista local
    console.log("Empleo eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar el empleo: ", error);
  }
};

const redirect = () => {
  router.push('/post-job');
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
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #707070;
  text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.7);
  overflow: hidden; /* Evita que el video se salga del contenedor */
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Asegura que el video cubra todo el espacio */
  z-index: -1; /* Asegura que el video esté detrás del contenido */
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
}


/* Categorías de Empleo */
.categories-section {
  padding: 2rem 0;
}

.section-title {
  font-size: 2.5rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 2rem;
}

.category-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-10px);
}

.icon {
  font-size: 3rem;
  color: #007bff;
  margin-bottom: 1rem;
}

/* Empleos Populares */
.jobs-section {
  padding: 2rem 0;
}

.btn-primary {
  background-color: #afaeae;
  border-color: #a5a5a5;
  color: #000000;
}

.btn-primary:hover {
  background-color: #5a5959;
  border-color: #000000;
  color: #000000;
}

.rounded-button {
  border-radius: 25px;
  padding: 10px 10;
}
</style>

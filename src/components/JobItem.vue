<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div v-for="(job, index) in jobs" :key="index" class="d-flex justify-content-center">
        <div class="single-job-items mb-30 d-flex flex-column align-items-center">
          <div class="job-items d-flex align-items-center">
            <div class="company-img">
              <img :src="company_user_data.icon">
            </div>
            <div class="job-tittle">
              <router-link :to="{ name: 'candidates' }">
                <h4>{{ job.Título }}</h4>
              </router-link>
              <ul>
                <li>{{ job.nombre }}</li>
                <li><i class="fas fa-map-marker-alt"></i>{{ job.Distrito }}</li>
                <li>${{ job.Salario }}</li>
              </ul>
            </div>
          </div>
          <div class="items-link f-right">
            {{ job.Tipo }} <br>
            <span>{{ job.Modalidad }}</span>
          </div>
          <!-- Botón de eliminar -->
          <button @click="deleteJob(job.id)" class="btn btn-danger mt-2">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/js/firebase';
import { getAuth } from 'firebase/auth';

// Definir las propiedades del componente
const props = defineProps({
  jobs: {
    type: Array,
    required: true
  }
});

// Crear una copia local de jobs
const localJobs = ref([...props.jobs]);

// Estado reactivo para los datos de la empresa
const company_user_data = ref({
  icon: require('@/assets/img/logoTA.png'), // Ícono por defecto
});

// Función para obtener el ícono de la empresa
const getCompanyIcon = async () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (currentUser) {
    const companyRef = doc(db, "usuariosEmpresa", currentUser.uid);
    const companySnap = await getDoc(companyRef);
    if (companySnap.exists()) {
      const data = companySnap.data();
      company_user_data.value = {
        icon: data.logoUrl || company_user_data.value.icon,
      };
    } else {
      console.log("No se encontraron los datos de la empresa");
    }
  } else {
    console.log("El usuario no ha iniciado sesión.");
  }
};

// Función para eliminar un empleo de Firebase y actualizar la lista local
const deleteJob = async (jobId) => {
  try {
    await deleteDoc(doc(db, 'empleos', jobId));
    // Remover el empleo eliminado del array localJobs
    localJobs.value = localJobs.value.filter(job => job.id !== jobId);
    console.log("Empleo eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar el empleo: ", error);
  }
};

// Llamar la función al montar el componente
onMounted(() => {
  getCompanyIcon();
});
</script>

<style scoped>
.featured-job-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.row {
  width: 100%;
}

.col-xl-10,
.col-lg-10,
.col-md-10,
.col-sm-12 {
  display: flex;
  justify-content: center;
}

.container {
  max-width: 1200px;
}

.min-vh-100 {
  min-height: 100vh;
}

.single-job-items {
  border: 2px solid #c4c6ce;
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s ease;
  background-color: white;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  width: 100%;
  max-width: 800px;
}

.single-job-items:hover {
  background-color: #c4c6ce;
  color: #ffffff;
}

.single-job-items a {
  color: black;
  text-decoration: none;
}

.single-job-items a:hover {
  text-decoration: underline;
}

.company-img img {
  max-width: 50px;
}

.job-items {
  display: flex;
  align-items: center;
}

.items-link {
  margin-top: 10px;
}

button.btn-danger {
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
}

button.btn-danger:hover {
  background-color: #dc3545;
}
</style>

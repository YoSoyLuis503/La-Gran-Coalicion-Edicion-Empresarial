<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div v-for="(job, index) in props.jobs" :key="index" class="d-flex justify-content-center">
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
          <div class="row">
            <div class="col text-end col-btn">
              <button @click="sendJob(job.id)" class="btn btn-edit mt-2"><i class="bi bi-pencil-square"></i></button>
            </div>
            <div class="col text-start col-btn ">
              <button @click="deleteJob(job.id)" class="btn btn-delete mt-2"><i class="bi bi-trash3"></i></button>
            </div>
          </div>
          <!-- <div class="row">
            <div class="col text-end">
              <p class="chiquito">Editar</p>
            </div>
            <div class="col text-start ">
              <p class="chiquito">Borrar</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, defineEmits } from 'vue';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/js/firebase';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter()

// Definir las propiedades del componente
const props = defineProps({
  jobs: {
    type: Array,
    required: true
  }
});

const sendJob = (jobId) => {
  router.push({
    name: 'edit-job',
    params: { jobId },
  });
};

// Emitir evento
const emit = defineEmits(['delete-job']);

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

// Función para eliminar un empleo de Firebase y emitir el cambio
const deleteJob = async (jobId) => {
  try {
    // Eliminar el empleo de Firestore
    await deleteDoc(doc(db, 'empleos', jobId));
    console.log("Empleo eliminado correctamente.");

    // Emitir el evento para que el componente padre actualice la lista
    emit('delete-job', jobId);
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
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  width: 100%;
  max-width: 800px;
}

.single-job-items:hover {
  transform: translateY(-10px);
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

button.btn-delete {
  color: #4F4F4F;
  font-size: 1.5em;
  background-color: none;
  border: none;
}

.btn-delete:hover {
  transition: transform 0.3s ease;
  font-size: 1.8em; 
}

.btn-edit {
  color: #4F4F4F;
  font-size: 1.5em;
  background-color: none;
  border: none;
}

.btn-edit:hover {
  transition: transform 0.3s ease;
  font-size: 1.8em; 
}

.chiquito{
  font-size: 1rem;
}

.col-btn{
  height: 50px;
}
</style>

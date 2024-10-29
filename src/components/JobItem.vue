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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/js/firebase';
import { getAuth } from 'firebase/auth';
// Definir las propiedades del componente
const props = defineProps({
  jobs: {
    type: Array,
    required: true
  }
});
props.value

const company_user_data = ref({
  icon: require('@/assets/img/logoTA.png'), // Ícono por defecto
});

//Obtener icono de la empresa
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
    }
    else {
      console.log("No se encontraron los datos de la empresa")
    }
  } else {
    console.log("El usuario no ha iniciado sesión.");
  }
}

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
  /* Asegura que el texto esté centrado */
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
  /* Ancho máximo para limitar la extensión del contenido */
}

.single-job-items:hover {
  background-color: #c4c6ce;
  /* Cambia a un tono gris al pasar el ratón */
  color: #ffffff;
  /* Mantiene el color del texto */
}

/* Cambiar el color de todos los enlaces a negro */
.single-job-items a {
  color: black;
  /* Color negro para todos los enlaces */
  text-decoration: none;
  /* Sin subrayado por defecto */
}

.single-job-items a:hover {
  text-decoration: underline;
  /* Subrayado al pasar el ratón */
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
</style>
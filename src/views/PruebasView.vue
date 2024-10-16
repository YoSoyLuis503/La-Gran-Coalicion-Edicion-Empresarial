<template>

    <header>
        <NavbarComponent />
    </header>
    <div class="container-fluid text-center">
        <div class="row">
            <div class="col-md-4" v-for="(faculty, index) in faculties" :key="index">
                <div class="faculty-box">
                    <div class="row" style="font-size: 1.2em;"><label>{{ faculty.name }}</label></div>
                    <div class="row"><label>({{ faculty.count }})</label></div>
                    <div class="row mt-2"><label>{{ faculty.description }}</label></div>
                </div>

            </div>
        </div>
    </div>

    <div class="container-fluid">
        <SelectComponent v-model="selectedEmploymentMode" :options="employmentOptions" placeholder="Modalidad de empleo" />
    </div>

    <div class="container">
        <p>Esto es un correo: {{ email }}</p>
    </div>

    <FooterComponent />

</template>

<script setup>
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import { db } from '@/js/firebase';
import { doc, getDoc } from "firebase/firestore";
import { ref, onMounted } from 'vue';
const faculties = ref([
    { name: "Ciencias y Humanidades", count: 653, icon: "flaticon-tour", description: "Explora áreas de arte, filosofía y más." },
    { name: "Ciencias de la Salud", count: 658, icon: "flaticon-cms", description: "Forma parte de las profesiones de la salud." },
    { name: "Ingeniería y Arquitectura", count: 658, icon: "flaticon-report", description: "Construye el futuro con nuestras ingenierías." },
    { name: "Derecho y R. Internacionales", count: 658, icon: "flaticon-app", description: "Desarrolla tu carrera en leyes y relaciones." },
    { name: "Ingeniería en Sistemas", count: 658, icon: "flaticon-helmet", description: "Impulsa tu futuro en la tecnología." },
    { name: "Ciencias y Tecnología", count: 658, icon: "flaticon-high-tech", description: "Innova en un mundo tecnológico." },
    { name: "Postgrado", count: 658, icon: "flaticon-real-estate", description: "Amplía tus horizontes académicos." },
    { name: "Otros", count: 658, icon: "flaticon-content", description: "Descubre diversas oportunidades." }
]);


const selectedEmploymentMode = ref('');
const employmentOptions = [
    { value: 'presencial', text: 'Presencial' },
    { value: 'remoto', text: 'Remoto' },
    { value: 'hibrido', text: 'Híbrido' }
];

const email = ref('');

const fetchUserEmail = async () => {
  const userId = 'hRnJXie6m7TIhIl2EI0ApJIJFVQ2'; // Cambia esto por el ID del documento que deseas obtener
  const docRef = doc(db, "usuarios", userId);
  
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      email.value = docSnap.data().correo; // Cambia 'correo' por el nombre del campo que deseas obtener
    } else {
      console.log("No existe el documento!");
    }
  } catch (error) {
    console.error("Error al obtener el documento:", error);
  }
};

onMounted(fetchUserEmail);

</script>

<style scoped>
.faculty-box {
    border: 2px solid #007bff;
    border-radius: 10px;
    padding: 20px;
    max-height: 400px;
    transition: all 0.3s ease;
    background-color: white;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
}
</style>
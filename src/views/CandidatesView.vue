<template>
    <header>
        <NavbarComponent />
    </header>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col text-center">
                <div class="row">
                    <div class="col-md-6 mt-4">
                        <SearchBar />
                    </div>
                    <div class="col-md-6  mt-4">
                        <SelectComponent :model-value="filtro" :required=true :options="filtros" />
                    </div>
                </div>
                <div class="row text-start">
                    <div class="mt-4">
                        <h2>{{ title }}</h2>
                        <p>{{ description }}</p>
                    </div>
                </div>
                <div class="row">
                    <CandidateCard />
                </div>
            </div>
        </div>

    </div>

    <FooterComponent />
</template>

<script setup>
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue'
import SearchBar from '@/components/SearchBar.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import CandidateCard from '@/components/CandidateCard/CandidateCard.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { ref, onMounted } from 'vue';
import { db } from '@/js/firebase';
import { doc, getDoc} from 'firebase/firestore';
import { useRoute} from 'vue-router';

let filtros = ["Nombre (A-Z)", "Nombre (Z-A)", "Edad M-m", "Edad m-M", "Más reciente", "Más antiguo", "Favoritos"]
let filtro = ref('Más reciente')

const route = useRoute()
const jobId = route.params.jobId
console.log(jobId)

const title = ref("")
const description = ref("")

// Función para obtener los datos del empleo desde Firestore
const fetchJobData = async () => {
    if (jobId) {
        const jobRef = doc(db, "empleos", jobId);
        const jobSnap = await getDoc(jobRef);

        if (jobSnap.exists()) {
            const jobData = jobSnap.data();
            title.value = jobData.Título;
            description.value = jobData.Descripción;
        } else {
            console.log("No se encontró el empleo.");
        }
    }
};

// Llama a la función para cargar los datos al montar el componente
onMounted(() => {
    fetchJobData();
});
</script>
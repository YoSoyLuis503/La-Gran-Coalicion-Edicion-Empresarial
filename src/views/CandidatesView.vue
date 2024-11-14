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
                    <AboutJob />
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
// import { ref, computed } from 'vue';
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';
import SearchBar from '@/components/SearchBar.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import AboutJob from '@/components/AboutJob.vue';
import CandidateCard from '@/components/CandidateCard/CandidateCard.vue';
import FooterComponent from '@/components/FooterComponent.vue';

// // Lista original de candidatos (puedes reemplazarla con datos de Firebase si es necesario)
// const candidates = ref([
//   { name: 'Pedro', age: 19, technicalSkills: 'Vue', softSkills: 'Comunicación' },
//   { name: 'Lucas', age: 20, technicalSkills: 'React', softSkills: 'Trabajo en equipo' },
//   // Agrega más candidatos aquí
// ]);

// // Estado para el término de búsqueda
// const searchTerm = ref('');
// const filtro = ref('Más reciente');
// const filtros = ["Nombre (A-Z)", "Nombre (Z-A)", "Edad M-m", "Edad m-M", "Más reciente", "Más antiguo", "Favoritos"];

// // Filtrar candidatos en base al término de búsqueda y el filtro
// const filteredCandidates = computed(() => {
//   let result = candidates.value;

//   if (searchTerm.value) {
//     result = result.filter(candidate =>
//       candidate.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
//       candidate.technicalSkills.toLowerCase().includes(searchTerm.value.toLowerCase())
//     );
//   }

//   // Puedes añadir lógica adicional para ordenar o filtrar según el campo `filtro`
//   return result;
// });
</script>
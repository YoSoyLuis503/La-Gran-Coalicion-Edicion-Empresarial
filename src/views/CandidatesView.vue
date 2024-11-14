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
import { ref } from 'vue';
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue'
import SearchBar from '@/components/SearchBar.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import AboutJob from '@/components/AboutJob.vue';
import CandidateCard from '@/components/CandidateCard/CandidateCard.vue';
import FooterComponent from '@/components/FooterComponent.vue';

let filtros = ["Nombre (A-Z)", "Nombre (Z-A)", "Edad M-m", "Edad m-M", "Más reciente", "Más antiguo", "Favoritos"]
let filtro = ref('Más reciente')
</script>
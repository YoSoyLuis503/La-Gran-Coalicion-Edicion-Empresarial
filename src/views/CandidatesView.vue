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
                        <SelectComponent />
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
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue'
import SearchBar from '@/components/SearchBar.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import AboutJob from '@/components/AboutJob.vue';
import CandidateCard from '@/components/CandidateCard/CandidateCard.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>
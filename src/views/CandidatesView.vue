<template>
    <header>
        <NavbarComponent />
    </header>

    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-3">
                <FilterCandidates />
            </div>
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-6 mt-4">
                        <SearchBar />
                    </div>
                    <div class="col-md-2 mt-4 text-start">
                        <SearchButton />
                    </div>
                    <div class="col-md-4  mt-4">
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

</template>

<script setup>
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue'
import FilterCandidates from '@/components/FilterCandidates.vue';
import SearchBar from '@/components/SearchBar.vue';
import SearchButton from '@/components/SearchButton.vue';
import SelectComponent from '@/components/SelectComponent.vue';
import AboutJob from '@/components/AboutJob.vue';
import CandidateCard from '@/components/CandidateCard/CandidateCard.vue';
</script>

<style scoped></style>
<template>
    <div class="container-fluid ">

        <div class="row mt-4 text-center">
            <div class="col text-end"><i class="bi bi-filter"> </i></div>
            <div class="col text-start">
                <h8>Filtrar</h8>
            </div>
        </div>

        <div class="container-fluid custom-container mt-5">
            <div class="row mt-3" v-for="(m) in 3" :key="m">
                <div class="row mt-2">
                    <div class="row text-start">
                        <h5>Filtro select {{ m }}</h5>
                    </div>
                    <div class="row text-start">
                        <SelectComponent />
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="row text-start">
                        <h5>Filtro Checkbox {{ m }}</h5>
                    </div>
                    <div class="row text-start">
                        <CheckBoxes />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SelectComponent from './SelectComponent.vue';
import CheckBoxes from './CheckBoxes.vue';
</script>

<style scoped>
.custom-container {
    padding-top: 10px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0px;
}
</style>
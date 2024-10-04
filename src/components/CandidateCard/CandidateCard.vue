<template>
    <div class="row">
        <div class="col-6" v-for="(candidate, index) in candidates" :key="index">
            <div class="candidate-card">
                <img src="@/assets/logo.png" alt="Candidate Photo">
                <h5>{{ candidate.name }}</h5>
                <p>EDAD: {{ candidate.age }}<br>
                    CUM: {{ candidate.cum }}<br>
                    ESTADO ACADÉMICO: {{ candidate.academicStatus }}
                </p>
                <div class="button-group">
                    <VerMas />
                    <BookmarkButton />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VerMas from './VerMas.vue';
import BookmarkButton from './BookmarkButton.vue';
import { ref } from 'vue';

let candidates = ref([
    { name: "Pedro", age: 19, cum: 9.1, academicStatus: "ACTIVO" },
    { name: "Lucas", age: 20, cum: 10, academicStatus: "ACTIVO" },
    { name: "Juan", age: 20, cum: 8.2, academicStatus: "EGRESADO" },
    { name: "Sofia", age: 18, cum: 9, academicStatus: "RETIRADO" },
    { name: "Rosa", age: 29, cum: 5, academicStatus: "RETIRADO" },
    { name: "Sandra", age: 24, cum: 7.9, academicStatus: "EGRESADO" },
    { name: "Saúl", age: 22, cum: 8.3, academicStatus: "ACTIVO" }
]);
</script>

<style scoped>
.candidate-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.candidate-card img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
}

.button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    /* Espacio entre botones */
    margin-top: 20px;
}
</style>
<template>
    <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4" v-for="(candidate, index) in candidates" :key="index">
            <div class="container candidate-card">
                <div class="row"><img :src="candidate.profilePhoto"></div>
                <div class="row">
                    <h5>{{ candidate.name }}</h5>
                </div>
                <div class="row">
                    <p>Objetivos: {{ candidate.goals }}<br>
                        Habilidades técnicas: {{ candidate.technicalSkills }}<br>
                        Habilidades blandas: {{ candidate.softSkills }}
                    </p>
                </div>
                <div class="row button-group">
                    <div class="col text-end"><VerMas /></div>
                    <div class="col text-start"><BookmarkButton /></div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import VerMas from './VerMas.vue';
import BookmarkButton from './BookmarkButton.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '@/js/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Obtener jobId del enrutador
const route = useRoute();
const jobId = route.params.jobId;
console.log(jobId)

// Estado para almacenar los candidatos
const candidates = ref([]);

const fetchCandidates = async () => {
    try {
        const querySnapshot = await getDocs(
            query(collection(db, "users"), where("solicitedJobs", "array-contains", jobId))
        );
        candidates.value = querySnapshot.docs.map(doc => ({
            name: doc.data().fullName,
            goals: doc.data().professionalGoal,
            technicalSkills: doc.data().technicalSkills,
            softSkills: doc.data().softSkills,
            profilePhoto: doc.data().profilePhoto,
        }));
    } catch (error) {
        console.error("Error fetching candidates: ", error);
    }
};

onMounted(() => {
    fetchCandidates();
});
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.candidate-card:hover{
    transform: translateY(-10px);
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
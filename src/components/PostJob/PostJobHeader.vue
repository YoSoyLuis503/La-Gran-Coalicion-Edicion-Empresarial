<template>
    <h1>Publicar Empleo</h1>
    <div class="col">
        <img :src="company_user_data.icon" alt="Company Logo" class="img-fluid" style="max-width: 115px;">
    </div>
    <div class="col">
        <div class="text-start">
            <label>Nombre: {{ company_user_data.name }}</label>
        </div>
        <div class="text-start mt-2">
            <label>Correo: {{ company_user_data.email }}</label>
        </div>
        <div class="text-start mt-2">
            <label>Telefono: {{ company_user_data.tel }}</label>
        </div>
        <div class="text-start mt-2">
            <label>Sector: {{ company_user_data.sector }}</label>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/js/firebase';

// Datos reactivas de la empresa
const company_user_data = ref({
    icon: require('@/assets/img/logoTA.png'), // Coloca un ícono por defecto
    name: '',
    email: '',
    tel: '',
    sector: ''
});

// Función para obtener datos de la empresa desde Firestore
const fetchCompanyData = async () => {
    const companyRef = doc(db, "usuarios", "hRnJXie6m7TIhIl2EI0ApJIJFVQ2"); // Reemplaza "companyId" con el ID real de la empresa
    const companySnap = await getDoc(companyRef);

    if (companySnap.exists()) {
        const data = companySnap.data();
        company_user_data.value = {
            icon: data.icon || company_user_data.value.icon, // Usa un ícono por defecto si no existe en Firestore
            name: data.nombreEmpresa || 'Sin nombre',
            email: data.correo || 'Sin correo',
            tel: data.telefono || 'Sin teléfono',
            sector: data.sector || 'Sin sector'
        };
    } else {
        console.log("No se encontraron datos para la empresa.");
    }
};

// Llamar la función al montar el componente
onMounted(() => {
    fetchCompanyData();
});
</script>

<style scoped></style>

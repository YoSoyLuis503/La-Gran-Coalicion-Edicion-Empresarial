<template>
    <div class="row">
        <h4>Información general</h4>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/js/firebase';
import { getAuth } from 'firebase/auth';
import { defineEmits } from 'vue';


// Configura la función de emitir para comunicar con el componente padre
const emit = defineEmits(['sendCompanyData']);

// Datos reactivos de la empresa
const company_user_data = ref({
    icon: require('@/assets/img/logoTA.png'), // Ícono por defecto
    name: '',
    email: '',
    tel: '',
    sector: ''
});

// Función para obtener datos de la empresa desde Firestore
const fetchCompanyData = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
        const companyRef = doc(db, "usuariosEmpresa", currentUser.uid);
        const companySnap = await getDoc(companyRef);

        if (companySnap.exists()) {
            const data = companySnap.data();
            company_user_data.value = {
                icon: data.logoUrl || company_user_data.value.icon,
                name: data.nombreEmpresa || 'Sin nombre',
                email: data.correo || 'Sin correo',
                tel: data.telefono || 'Sin teléfono',
                sector: data.sector || 'Sin sector'
            };

            // Emitimos los datos actualizados al componente padre
            emit('sendCompanyData', company_user_data.value);
        } else {
            console.log("No se encontraron datos para la empresa.");
        }
    } else {
        console.log("El usuario no ha iniciado sesión.");
    }
};

// Llamar la función al montar el componente
onMounted(() => {
    fetchCompanyData();
});
</script>

<style scoped></style>

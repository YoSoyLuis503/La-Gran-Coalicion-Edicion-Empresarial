<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link :to="{name:'Home'}">
                <img :src="company_user_data.icon" height="50">
            </router-link>    
            <!-- Botón de alternancia para la vista móvil
            Este botón se muestra en dispositivos móviles y colapsa/expande el menú de navegación -->
            <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span> 
            </button> -->
            <div class="justify-content-center" id="navbarNav">
                <NavbarRoutes />
            </div>
            <div class="d-flex">
                <SignOut/>
            </div>
        </div>
    </nav>
</template>

<script setup>
import NavbarRoutes from './NavbarRoutes.vue';
import SignOut from './SignOut.vue';
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/js/firebase';
import { getAuth } from 'firebase/auth';

const company_user_data = ref({
    icon: require('@/assets/img/logoTA.png'), // Ícono por defecto
});

//Obtener icono de la empresa
const getCompanyIcon = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
        const companyRef = doc(db, "usuariosEmpresa", currentUser.uid);
        const companySnap = await getDoc(companyRef);
        if(companySnap.exists()){
            const data = companySnap.data();
            company_user_data.value = {
                icon: data.logoUrl || company_user_data.value.icon,
            };
        }
        else{
            console.log ("No se encontraron los datos de la empresa")
        }
    } else {
        console.log("El usuario no ha iniciado sesión.");
    }
}

// Llamar la función al montar el componente
onMounted(() => {
    getCompanyIcon();
});

</script>


<style></style>
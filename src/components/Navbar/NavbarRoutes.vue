<template>
    <nav>
        <div class="container-fluid">
            <div class="row">
                <!-- Para seleccionar el dato de cada ruta utilizamos el indice de la lista -->
                <div class="col-auto" v-for="(ruta, index) in rutas" :key="index">
                    <router-link :to="{ name: ruta.name }" class="nav-item">{{ ruta.text }}</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>


<script setup>
import { ref } from 'vue';
// Creamos un diccionario de rutas que contiene el "name" de la ruta
// y un "text" que aparecerá en el navbar
let rutas = ref([
    { name: 'Home', text: 'Inicio' },
    { name: 'candidates', text: 'Ver Candidatos' },
])
</script>


<style scoped>
nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;
        transition: color 0.3s ease;
        text-decoration: none;
        /* Quitar subrayado */

        &.router-link-exact-active {
            color: #42b983;
        }

        &:hover {
            color: #42b983;
        }
    }

}
</style>
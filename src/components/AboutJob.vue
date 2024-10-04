<template>
    <div class="mt-4">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
    </div>
</template>

<script setup>
import { ref} from 'vue';
let title = ref("Titulo del puesto");
let description = ref("Descripcion del puesto");
</script>

<style scoped>
h2, p{
    color: #011b40
}
</style>
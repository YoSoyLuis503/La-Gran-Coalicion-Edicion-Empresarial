<template>
    <button class="bookmark-btn" @click="toggleBookmark">
        <i :class="favorite"></i>
    </button>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';

let emit = defineEmits(['updateFavorite'])

// Estado reactivo para determinar si está marcado o no
const isFavorite = ref(false);

// Computed para alternar el icono dependiendo del estado
const favorite = computed(() =>
    isFavorite.value ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'
);

// Función que alterna el estado
const toggleBookmark = () => {
    isFavorite.value = !isFavorite.value;
    emit("updateFavorite",isFavorite.value)
};
</script>

<style scoped>
.bookmark-btn {
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #808080;
    transition: color 0.3s ease;
    padding: 0;
    height: 50px;
}

.bi-bookmark-fill{
    transition: color 0.5s ease;
    color: #4F4F4F;
}

.bookmark-btn:focus {
    outline: none;
}

.bookmark-btn:hover{
    transition: transform 0.3s ease;
    font-size: 1.8em;
}
</style>
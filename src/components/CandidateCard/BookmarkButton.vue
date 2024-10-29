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
    font-size: 24px;
    cursor: pointer;
    color: #011b40;
    transition: color 0.3s ease;
    padding: 0;
}

.bi-bookmark-fill{
    transition: color 0.5s ease;
    color: #0b17c5ed;
}

.bookmark-btn:focus {
    outline: none;
}
</style>
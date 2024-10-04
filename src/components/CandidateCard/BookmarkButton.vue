<template>
    <button class="bookmark-btn" @click="toggleBookmark">
        <i :class="bookmarkIcon"></i>
    </button>
</template>

<script setup>
import { ref, computed } from 'vue';

// Estado reactivo para determinar si está marcado o no
const isBookmarked = ref(false);

// Computed para alternar el icono dependiendo del estado
const bookmarkIcon = computed(() =>
    isBookmarked.value ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'
);

// Función que alterna el estado
const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value;
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
    color: #2BBBAD;
}

.bookmark-btn:focus {
    outline: none;
}
</style>
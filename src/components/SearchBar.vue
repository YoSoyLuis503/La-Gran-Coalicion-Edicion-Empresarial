<template>
    <div class="input-group">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search">
        <SearchButton />
    </div>
</template>

<script setup>
import SearchButton from './SearchButton.vue';
</script>

<style scoped>
.form-control {
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
}
</style>

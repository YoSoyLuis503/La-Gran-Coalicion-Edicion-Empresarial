<template>
    <div class="row" v-for="(m) in 4" :key="m">
        <div class="col-md-2 text-end"><input type="checkbox"></div>
        <div class="col-md-10 text-start"><label>Opcion {{ m }}</label></div>
        
    </div>

</template>

<script setup>

</script>

<style scoped></style>
<template>
  <div id="app">

    <div id="AppNavbar">
    <AppNavbar />
    <router-view></router-view>
    </div>

  </div>

  

</template>

<script>
import AppNavbar from './components/AppNavbar.vue';

export default {
  name: 'App',
  components: {

    AppNavbar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
}

</style>


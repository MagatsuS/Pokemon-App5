<script setup>
</script>

<template>
  <div id="app" class="container">
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import PokemonList from './components/PokemonList.vue';
export default {
  components: {
    PokemonList,
  },
};
</script>

<style>
#app {
  margin-top: 20px;
}
</style>

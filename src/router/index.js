import { createRouter, createWebHistory } from 'vue-router';
import PokemonList from '../components/PokemonList.vue';
import PokemonDetails from '../views/PokemonDetails.vue';
import PokemonEdit from '../views/PokemonEdit.vue';

const routes = [
  { path: '/', component: PokemonList },
  { path: '/pokemon/:name', name: 'PokemonDetails', component: PokemonDetails },
  { path: '/pokemon/:name/edit', name: 'PokemonEdit', component: PokemonEdit },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

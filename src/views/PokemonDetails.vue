<template>
  <div v-if="isLoading" class="d-flex justify-content-center align-items-center full-screen">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else-if="error" class="full-screen d-flex flex-column justify-content-center align-items-center">
    <p class="text-danger">{{ error }}</p>
  </div>
  <div v-else class="container my-4">
    <h2 class="text-center mb-4">Pokémon Details</h2>
    <div class="card pokemon-card">
      <img :src="pokemon.image" alt="Image of {{ pokemon.name }}" class="card-img-top pokemon-image">
      <div class="card-body text-center">
        <h1 class="card-title display-1"><strong>{{ pokemon.name }}</strong></h1>
        <p class="card-text lead"><strong>Height:</strong> {{ pokemon.height }} decimeters</p>
        <p class="card-text lead"><strong>Weight:</strong> {{ weightInPounds }} lbs</p>
        <p class="card-text lead"><strong>Abilities:</strong> {{ abilities }}</p>
        <div class="mt-3">
          <router-link :to="{ name: 'PokemonEdit', params: { name: pokemon.name } }" class="btn btn-lg btn-primary" style="background-color: brown;">Edit</router-link>
          <router-link to="/" class="btn btn-lg btn-secondary mt-3">Back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { usePokemonStore } from '@/stores/PokemonStore';

export default {
  data() {
    return {
      isLoading: true,
      error: null,
    };
  },
  computed: {
    pokemon() {
      const store = usePokemonStore();
      return store.pokemonDetails;
    },
    abilities() {
      if (!this.pokemon || !this.pokemon.abilities) return '';
      return this.pokemon.abilities.map(ability => ability.ability.name).join(', ');
    },
    weightInPounds() {
      if (!this.pokemon) return '';
      const weightInHectograms = this.pokemon.weight;
      const weightInGrams = weightInHectograms * 100;
      const weightInPounds = weightInGrams / 453.592;
      return weightInPounds.toFixed(1);
    }
  },
  async created() {
    const { name } = this.$route.params;
    const store = usePokemonStore();
    
    try {
      if (!store.pokemonDetails.name || store.pokemonDetails.name.toLowerCase() !== name) {
        await store.fetchPokemonDetails(name); // Fetch details if not already in store
      }
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      this.error = 'Failed to load Pokémon details.';
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.full-screen {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: capitalize;
}

.pokemon-card {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  background-color: blanchedalmond;
  /* Box shadow for 3D effect */
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1);
  /* Adding a subtle 3D perspective */
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-right: 350px;
}

/* Add depth on hover */
.pokemon-card:hover {
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* Enhanced image styling */
.pokemon-image {
  max-width: 100%;
  height: auto;
  border-bottom: 1px solid black;
}

/* Card body styling */
.card-body {
  padding: 4rem;
  background: linear-gradient(to bottom, #fff8e1, #ffecb3);
}

/* Title and text adjustments */
.display-1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.lead {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.btn-lg {
  font-size: 1.25rem;
  margin-top: 16px;
}

/* Button primary styling */
.btn-primary {
  background-color: brown;
  border-color: brown;
}

.btn-primary:hover {
  background-color: darkbrown;
  border-color: darkbrown;
}

/* Heading styling */
h2 {
  font-size: 2rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 350px;
}

</style>


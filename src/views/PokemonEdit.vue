<template>
  <div v-if="isLoading" class="d-flex justify-content-center align-items-center full-screen">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else>
    <div class="full-screen d-flex flex-column justify-content-center align-items-center text-center">
      <h1 class="display-1"><strong>Edit Pokémon</strong></h1>
      <!-- <img :src="pokemonImage" alt="Image of {{ pokemonName }}" class="img-fluid pokemon-image mb-3"> -->
      <form @submit.prevent="updatePokemon" class="w-75">
        <div class="mb-4">
          <label for="pokemonName" class="form-label display-4">Pokémon Name</label>
          <input type="text" id="pokemonName" v-model="pokemonName" class="form-control form-control-lg text-capitalize" />
        </div>
        <button type="submit" class="btn btn-lg btn-primary" style="background-color: brown;">Save</button>
        <router-link to="/" class="btn btn-lg btn-secondary mt-3 custom-back-btn">Back</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { usePokemonStore } from '@/stores/PokemonStore';

export default {
  data() {
    return {
      pokemonName: '',
      pokemonImage: '',
      isLoading: true,
    };
  },
  async created() {
    const { name } = this.$route.params;
    const store = usePokemonStore();
    
    try {
      // Fetch Pokémon details from the store
      this.pokemonName = store.pokemonDetails.name || name;
      this.pokemonImage = `https://img.pokemondb.net/sprites/home/normal/${this.pokemonName}.png`;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
  async updatePokemon() {
    const store = usePokemonStore();
    const originalName = this.$route.params.name;
    const newName = this.pokemonName.toLowerCase();

    // Check if newName is valid
    if (newName.trim() === '' || newName !== this.pokemonName.toLowerCase()) {
      alert('Please enter a valid Pokémon name.');
      return;
    }

    try {
      // Update Pokémon name in the store
      store.updatePokemonName(this.pokemonName);
      await store.updatePokemonDetails(newName);

      // Redirect to the updated Pokémon details page
      this.$router.push({ name: 'PokemonDetails', params: { name: this.pokemonName.toLowerCase() } });
    } catch (error) {
      console.error('Error updating Pokémon details:', error);
      alert('Failed to update Pokémon details. Please try again.');
    }
  },
  }
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
  margin-right: 400px;
}

.pokemon-image {
  max-width: 900px;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.display-1 {
  font-size: 4rem;
  margin-bottom: 20px;
}

.lead {
  font-size: 2rem;
  margin-bottom: 10px;
}

.btn-lg {
  font-size: 1.5rem;
  margin-top: 15px;
}

strong {
  font-weight: bold;
}

.pokemon-types {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.custom-back-btn {
  position: center;
  bottom: 10px; /* Adjust value to position the button */
  margin-top: 0; /* Remove default margin if needed */
}
</style>


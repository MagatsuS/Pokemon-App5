<template>
  <div class="pokemon-list-container">
    <h1>Pokémon List</h1>
    <input type="text" v-model="searchQuery" placeholder="Search Pokémon" class="form-control mb-3" />

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <!-- Pokémon List -->
    <div class="row">
      <div class="col-md-4" v-for="pokemon in filteredPokemonList" :key="pokemon.name">
        <div class="card">
          <img :src="pokemon.image" class="card-img-top" :alt="pokemon.name">
          <div class="card-body">
            <h5 class="card-title">{{ pokemon.name }}</h5>
            <router-link :to="`/pokemon/${pokemon.name}`" class="btn btn-primary">View Details</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      pokemonList: [], // Assuming you have an array of Pokémon objects
      isLoading: true // Initially set to true, change to false after data is loaded
    };
  },
  computed: {
    filteredPokemonList() {
      return this.pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchPokemonList();
  },
  methods: {
    async fetchPokemonList() {
      // Simulate an API call to fetch the Pokémon list
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        this.pokemonList = data.results.map((pokemon, index) => ({
          name: pokemon.name,
          image: `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`,
          info: `This is a brief description of ${pokemon.name}.`
        }));
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>

h1 {
  font-family: 'Pokemon', sans-serif;
  font-size: 3rem;
  color: goldenrod;
  text-shadow: 2px 2px darkblue;
}


.spinner-border {
  display: flex;
  margin: 0 auto;
  width: 3rem;
  height: 3rem;
  border-width: 0.25em;
}

.card {
  margin-bottom: 1rem;
  width: 20rem;
  text-align: center;
  text-transform: capitalize;
  margin-right: 50rem;
  margin-left: 1rem; 
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover effects */
  background-color: lightgrey;
}

.card:hover {
  transform: translateY(-10px); /* Slightly lift the card on hover */
  box-shadow: 0 15px 30px, 0 10px 10px rgba(0, 0, 0, 0.2); /* Add a shadow effect on hover */
  background-color: blanchedalmond;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center items horizontally */
}

.col-md-4 {
  padding: 0.5rem; /* Add some padding around each column */
}

</style>

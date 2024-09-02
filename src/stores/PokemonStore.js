import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonDetails: {}, // Stores the details of the currently selected Pokémon
    pokemonList: [], // Optional: List of all Pokémon if needed for other parts of the app
    abilities: [],
  }),
  actions: {
    setPokemonDetails(details) {
      this.pokemonDetails = details;
    },
    async fetchPokemonList() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        this.pokemonList = response.data.results.map((pokemon) => ({
          name: pokemon.name,
          image: `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`,
          info: `This is a brief description of ${pokemon.name}.`
        }));
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    },
    async fetchPokemonDetails(name) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        this.pokemonDetails = {
          name: response.data.name,
          image: `https://img.pokemondb.net/sprites/home/normal/${response.data.name}.png`,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities,
        };
        // Update the Pokémon list with the new details
        const index = this.pokemonList.findIndex(pokemon => pokemon.name === this.pokemonDetails.name);
        if (index !== -1) {
          this.pokemonList[index] = {
            name: newName,
            image: `https://img.pokemondb.net/sprites/home/normal/${newName}.png`
          };
        }
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    },
    async updatePokemonDetails(newName) {
      try {
        // Fetch updated details for the new Pokémon name
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${newName}`);
        this.pokemonDetails = {
          name: response.data.name,
          image: `https://img.pokemondb.net/sprites/home/normal/${response.data.name}.png`,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities,
        };
      } catch (error) {
        console.error('Error updating Pokémon details:', error);
      }
    },
    updatePokemonName(newName) {
      const originalName = this.pokemonDetails.name;

      if (this.pokemonDetails) {
        this.pokemonDetails.name = newName;

        // Optionally update the name in the pokemonList if you're storing it there as well
        const index = this.pokemonList.findIndex(pokemon => pokemon.name === originalName);
        if (index !== -1) {
          this.pokemonList[index].name = newName;
        }
      }
    },
    async fetchPokemonList() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        this.pokemonList = response.data.results.map((pokemon) => ({
          name: pokemon.name,
          image: `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`,
          info: `This is a brief description of ${pokemon.name}.`
        }));
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    },
    updatePokemon(pokemon) {
      const index = this.pokemonList.findIndex(p => p.name === pokemon.name);
      if (index !== -1) {
        this.pokemonList[index] = { ...this.pokemonList[index], ...pokemon };
      }
    },
  },
});

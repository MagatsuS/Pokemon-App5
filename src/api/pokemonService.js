import axios from 'axios';

export const fetchPokemon = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
  return response.data.results;
};

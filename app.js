const pokemonRepository = (function () {
  const pokemonArray = [
    { name: 'Bulbasur', height: 0.7, type: ['grass', 'poison'] },
    { name: 'Charmander', height: 0.6, type: ['fire'] },
    { name: 'Squirtle', height: 0.5, type: ['water'] },
  ];

  function getAllPokemon() {
    return pokemonArray;
  }

  function addPokemon(pokemon) {
    pokemonArray.push(pokemon);
  }

  return {
    getAllPokemon,
    addPokemon,
  };
})();

// Add a new pokemon
pokemonRepository.addPokemon({
  name: 'Pikachu',
  height: 0.4,
  type: ['electric'],
});

// Log the pokemon array to the console
console.log(pokemonRepository.getAllPokemon());

// Create a function to log the pokemon's name
function printPokemonDetails(array) {
  array.forEach((pokemon) => {
    console.log(pokemon.name);
  });
}

// Invoke the function with the actual argument
printPokemonDetails(pokemonRepository.getAllPokemon());

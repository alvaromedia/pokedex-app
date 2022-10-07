const pokemonRepository = (function () {
  const pokemonArray = [];

  // Fetch the first 150 pokemon
  function fetchPokemon() {
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // For each pokemon create an object and push it into 'pokemonArray' with 'addPokemon' func
        data.results.forEach((pokemonObj) => {
          let pokemon = {
            name: pokemonObj.name,
            detailsUrl: pokemonObj.url,
          };
          addPokemon(pokemon);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Fetch a single pokemon's details
  function fetchPokemonDetails() {}

  // Get the whole pokemon array
  function getAllPokemon() {
    return pokemonArray;
  }

  // Add a new single pokemon object to the array
  function addPokemon(pokemonObj) {
    if (typeof pokemonObj !== 'object') return;
    pokemonArray.push(pokemonObj);
  }

  // Filter pokemon by name
  function filterPokemon(pokemonName) {
    return pokemonArray.filter((pokemonObj) => pokemonObj.name === pokemonName);
  }

  // With a given pokemon, create a button/list-item and insert it into the DOM
  function addListItem(pokemonObj) {
    const pokemonList = document.querySelector('.pokemon-list');
    const pokemonListItem = document.createElement('li');
    const pokemonButton = document.createElement('button');

    pokemonButton.innerText = pokemonObj.name;
    pokemonButton.classList.add('pokemon-button');

    pokemonList.appendChild(pokemonListItem);
    pokemonListItem.appendChild(pokemonButton);

    // Show details
    showDetails(pokemonButton, pokemonObj.name);
  }

  // On a click event in a button, log the pokemon name to the console
  function showDetails(button, pokemonName) {
    button.addEventListener('click', () => {
      console.log(pokemonName);
    });
  }

  // Returned value from the IIFE
  return {
    fetchPokemon,
    getAllPokemon,
    addPokemon,
    filterPokemon,
    addListItem,
  };
})();

pokemonRepository.fetchPokemon().then(() => {
  pokemonRepository.getAllPokemon().forEach((pokemonObj) => {
    pokemonRepository.addListItem(pokemonObj);
  });
});

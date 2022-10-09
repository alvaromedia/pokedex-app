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
  function fetchPokemonDetails(pokemonName) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        let selectedPokemon = {
          name: data.name,
          imageUrl: data.sprites.front_default,
          height: data.height,
          types: data.types,
        };

        return selectedPokemon;
      });
  }

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
  function filterPokemon(searchText) {
    return pokemonArray.filter((pokemonObj) =>
      pokemonObj.name.includes(searchText.toLowerCase())
    );
  }

  // When searching for a pokemon, empty the pokemon-list and insert new content in the pokemonArray
  function searchPokemon() {
    const searchBar = document.getElementById('search-bar');

    searchBar.addEventListener('keyup', () => {
      const pokemonList = document.querySelector('.pokemon-list');
      pokemonList.innerHTML = '';

      let filteredPokemon = filterPokemon(searchBar.value);
      filteredPokemon.forEach(createPokemonElement);
    });
  }

  // With a given pokemon, create a button/list-item and insert it into the DOM
  function createPokemonElement(pokemonObj) {
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

  // On a click event in a button, fetch details from a specific pokemon
  function showDetails(button, pokemonName) {
    button.addEventListener('click', () => {
      fetchPokemonDetails(pokemonName).then(displayModal);
    });
  }

  // Modal functionality
  function displayModal(fetchedPokemon) {
    const modalContainer = document.querySelector('.modal-container');
    const modal = document.createElement('div');

    // Clear modal container
    modalContainer.innerHTML = '';
    modalContainer.classList.add('is-visible');

    // Add class to the modal
    modal.classList.add('modal');

    // Create button to close the modal
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('btn-close');
    closeBtn.innerText = 'Close';

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    closeBtn.addEventListener('click', () => {
      hideModal();
    });

    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        hideModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideModal();
      }
    });

    const pokemonImage = document.createElement('img');
    pokemonImage.src = fetchedPokemon.imageUrl;

    const pokemonName = document.createElement('h1');
    pokemonName.innerText = fetchedPokemon.name;

    const pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = `Height: ${fetchedPokemon.height}`;

    const pokemonTypes = document.createElement('p');

    pokemonTypes.innerText = `Main type: ${fetchedPokemon.types[0].type.name} `;

    modal.appendChild(closeBtn);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonTypes);
    modalContainer.appendChild(modal);
  }

  // Returned value from the IIFE
  return {
    fetchPokemon,
    getAllPokemon,
    createPokemonElement,
    searchPokemon,
  };
})();

pokemonRepository.fetchPokemon().then(() => {
  pokemonRepository.getAllPokemon().forEach((pokemonObj) => {
    pokemonRepository.createPokemonElement(pokemonObj);
    pokemonRepository.searchPokemon();
  });
});

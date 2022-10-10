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

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonDetail = document.getElementById('pokemonInfo');

let offset = 0;
const limit = 10;
const maxRecordsAllowed = 151;

function pokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.mainType}">
    <div class="number">
      #${pokemon.id}
    </div>
    <div class="name">
      ${pokemon.name}
    </div>
    <div class="detail">
      <ol class="types">
        ${pokemon.types.map(type => `<ul class="type ${type}">${type}</ul>`).join('')}
      </ol>
      <img
        src="${pokemon.photo}"
        alt="${pokemon.name}"
      />
    </div>
  </li>
  `
}

function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit)
  .then(pokemons => {
    pokemonList.innerHTML += pokemons.map(pokemon => pokemonToLi(pokemon)).join('');
  })
}


loadPokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const currentRecords = offset + limit

  if (currentRecords >= maxRecordsAllowed) {
      const newLimit = maxRecordsAllowed - offset;
      loadPokemons(offset, newLimit);
      loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
      loadPokemons(offset, limit);
  }
});

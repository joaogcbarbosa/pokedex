const pokeApi = {};

function pokeApiToPokemon (pokemonDetail) {
    const pokemon = new Pokemon;
    pokemon.id = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;
    pokemon.types = pokemonDetail.types.map(typeSlot => typeSlot.type.name);
    [pokemon.mainType] = pokemon.types;
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

    return pokemon
};

pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonDetail => pokeApiToPokemon(pokemonDetail))
};

pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokemon => pokeApi.getPokemonsDetails(pokemon)))
    .then(pokemonsDetailsRequest => Promise.all(pokemonsDetailsRequest))
    .then(pokemonsDetails => pokemonsDetails)
};

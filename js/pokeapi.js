const pokeApi = {}

function convertApiDetailsToPokemonClass(pokeApiDetails) {
    const pokemon = new Pokemon();
    pokemon.number = pokeApiDetails.id;
    pokemon.name = pokeApiDetails.name;
    pokemon.sprite = pokeApiDetails.sprites.front_default;

    const types = pokeApiDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types
    pokemon.types = types;
    pokemon.mainType = type;

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertApiDetailsToPokemonClass)
        .catch((error) => console.error(error))
}

pokeApi.getPokemon = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonList) => pokemonList.map(pokeApi.getPokemonDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))
}
        
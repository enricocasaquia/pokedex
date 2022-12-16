function convertArrayPokemonToHtml_Li(pokemon) {
    return `
        <li class="card ${pokemon.mainType}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li id="${type}">${type}</li>`).join("")}
                </ol>
                <img src="${pokemon.sprite}" alt="${pokemon.name}">
            </div>
        </li>
    `
}
function loadPokemonOnScreen(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemonList = []) => {
        document.getElementById("pokemonList").innerHTML += pokemonList.map(convertArrayPokemonToHtml_Li).join("");
    })
}

const limit = 200
let offset = 0
const TotalMaxQuantity = parseInt(pokeApi.count);
loadPokemonOnScreen(offset, limit)

document.getElementById("loadMoreButton").addEventListener("click", () => {
    offset += limit;
    const NextPageMaxQuantity = offset + limit;

    if (NextPageMaxQuantity >= TotalMaxQuantity) {
        const newLimit = TotalMaxQuantity - offset;
        loadPokemonOnScreen(offset, newLimit);
        document.getElementById("loadMoreButton").parentElement.removeChild(document.getElementById("loadMoreButton"));
    }
    else {
        loadPokemonOnScreen(offset, limit);
    }
});
    
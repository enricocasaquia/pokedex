
function convertArrayPokemonToHtml_Li(pokemon) {
    return `
        <li class="card">
            <span class="number">#001</span>
            <span class="name">${pokemon.name.toUpperCase()}</span>
            <div class="details">
                <ol class="type">
                    <li>Grass</li>
                    <li>Poison</li>
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="${pokemon.name.toUpperCase()}">
            </div>
        </li>
    `
}

pokeApi.getPokemon().then((pokemonList) => {
    let newArray = [];
    for (let i = 0; i < pokemonList.length; i++) {
        newArray.push(convertArrayPokemonToHtml_Li(pokemonList[i]));
    }
    document.getElementById("pokemonList").innerHTML = newArray;
})
    
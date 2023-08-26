const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`



function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon">
        <span class="number">#${pokemon.pokedex_number}</span>
        <span class="name">${pokemon.name}</span>
            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`)}
                </ol>
                <img src="${pokemon.photo} alt="${pokemon.name}">
            </div>
    </li>`
}

const pokemonList = document.getElementById("pokemonList")



// then é o sucesso | Catch é o fracasso | Finally acontece independente do resultado
//debbuger (pra debugar no browser)
pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join("") //func map serve pra "MAPEAR E CONVERTER" | Join pra concatenar
})


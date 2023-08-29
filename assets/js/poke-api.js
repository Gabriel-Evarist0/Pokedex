const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name;
    pokemon.pokedex_number = pokeDetail.order;

    


    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.mainType = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    console.log(pokemon)
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
    
}

pokeApi.getPokemons = (offset = 0, limit = 8) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemon) => pokemon.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}


Promise.all([
    fetch("https://pokeapi.co/api/v2/pokemon/1").then((response) => response.json()),
    fetch("https://pokeapi.co/api/v2/pokemon/2").then((response) => response.json()),
    fetch("https://pokeapi.co/api/v2/pokemon/3").then((response) => response.json()),
    fetch("https://pokeapi.co/api/v2/pokemon/4").then((response) => response.json()),
]).then((results) =>{
    console.log(results)
})
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name;
    pokemon.pokedex_number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const typesUrl = pokeDetail.types.map((typeC) => typeC.type.url)
    pokemon.types = types
    pokemon.mainType = type
    pokemon.typeChartUrl = typesUrl
    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default
    pokemon.shinyPhoto = pokeDetail.sprites.other['official-artwork'].front_shiny
    pokemon.baseStatus.baseHP = pokeDetail.stats[0].base_stat
    pokemon.baseStatus.baseATK = pokeDetail.stats[1].base_stat
    pokemon.baseStatus.baseDEF = pokeDetail.stats[2].base_stat
    pokemon.baseStatus.baseSPA = pokeDetail.stats[3].base_stat
    pokemon.baseStatus.baseSPD = pokeDetail.stats[4].base_stat
    pokemon.baseStatus.baseSpeed = pokeDetail.stats[5].base_stat
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
    
}
pokeApi.getPokemonInfo = (pokemon) =>{
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}
pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemon) => pokemon.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getTypeChart = (url) =>{
    fetch(url)
        .then((response) => response.json())
        .then(console.log())

}


Promise.all([
    fetch("https://pokeapi.co/api/v2/pokemon/1").then((response) => response.json()),
    fetch("https://pokeapi.co/api/v2/pokemon/2").then((response) => response.json()),
    fetch("https://pokeapi.co/api/v2/pokemon/3").then((response) => response.json()),
    fetch("https://pokeapi.co/api/v2/pokemon/4").then((response) => response.json()),
]).then((results) =>{
    console.log(results)
})

const pokemonList = document.getElementById("pokemonList")
const loadButton  = document.getElementById("loadMoreBtn")
const limit = 8;
let offset = 0;
const maxRecords = 151;


function loadPokemonItens(offset, limit) {
    
    function convertPokemonToLi(pokemon){
        return 
    }
    // then é o sucesso | Catch é o fracasso | Finally acontece independente do resultado
    //debbuger (pra debugar no browser)
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.mainType}">
                <span class="number">#${pokemon.pokedex_number}</span>
                <span class="name">${pokemon.name}</span>
                    <div class="details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type  ${type}">${type}</li>`).join("")}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
            </li>`).join("")
        pokemonList.innerHTML += newHtml //func map serve pra "MAPEAR E CONVERTER" | Join pra concatenar
    })
}

loadPokemonItens()


loadButton.addEventListener("click", () => {
    offset += limit;
    const qntRecordNextPage = offset + limit;

    if(qntRecordNextPage >= maxRecords){

        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadButton.parentElement.removeChild(loadButton)

    }else{
        loadPokemonItens(offset, limit)
    }
})
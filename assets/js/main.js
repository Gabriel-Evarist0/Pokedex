
const pokemonList = document.getElementById("pokemonList")
const loadButton  = document.getElementById("loadMoreBtn")
const pokeListItem = pokemonList.childNodes
const limit = 8;
let offset = 0;
const maxRecords = 151;


function loadPokemonItens(offset, limit) {
    // then é o sucesso | Catch é o fracasso | Finally acontece independente do resultado
    //debbuger (pra debugar no browser)
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        
        const newHtml = pokemons.map((pokemon) => 
        `
            <li class="pokemon ${pokemon.mainType}" onclick = openPopup("${pokemon.name}")>
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

function openPopup(pokemon){
    const popup = document.getElementById("teste")
    const content = document.getElementById("content")
    popup.style.display = "block"
    content.setAttribute("style", "filter:brightness(0.5);")

    pokeApi.getPokemonInfo(pokemon)
        .then((response) => {
            console.log(response)
            const infoHtml = `
            <i class="gg-close" onclick="closePopup()"></i>
            <h1>${response.name}</h1>
            <div><img src="${response.photo}" alt="${response.name}"></div>
            <div class = "info">
                <div class = "stats">
                    <div class="progress-element progress-element--html" style = "display: inline-flex;">
                        <p class="progress-label">HP<br>${response.baseStatus.baseHP}</p>
                        <div class="progress-container">
                        <progress max="${maxHP(response.baseStatus.baseHP)}" value="${response.baseStatus.baseHP}">95%</progress>
                        </div>
                        <p class="progress-label">MAX ${maxHP(response.baseStatus.baseHP)}</p>
                    </div>
                    <div class="progress-element progress-element--html" style = "display: inline-flex;">
                        <p class="progress-label">ATK<br> ${response.baseStatus.baseATK}</p>
                        <div class="progress-container">
                            <progress max="${maxStats(response.baseStatus.baseATK)}" value="${response.baseStatus.baseATK}"></progress>
                        </div>
                        <p class="progress-label">MAX ${maxStats(response.baseStatus.baseATK)}</p>
                    </div>
                    <div class="progress-element progress-element--html" style = "display: inline-flex;">
                        <p class="progress-label">DEF<br>${response.baseStatus.baseDEF}</p>
                        <div class="progress-container">
                            <progress max="${maxStats(response.baseStatus.baseDEF)}" value="30">95%</progress>
                        </div>
                        <p class="progress-label">MAX ${maxStats(response.baseStatus.baseDEF)}</p>
                    </div>
                    <div class="progress-element progress-element--html" style = "display: inline-flex;">
                        <p class="progress-label">Sp.ATK<br>${response.baseStatus.baseSPA}</p>
                        <div class="progress-container">
                            <progress max="${maxStats(response.baseStatus.baseSPA)}" value="${response.baseStatus.baseSPA}"></progress>
                        </div>
                        <p class="progress-label">MAX ${maxStats(response.baseStatus.baseSPA)}</p>
                    </div>
                    <div class="progress-element progress-element--html" style = "display: inline-flex;">
                        <p class="progress-label">Sp.DEF<br>${response.baseStatus.baseSPD}</p>
                        <div class="progress-container">
                            <progress max="${maxStats(response.baseStatus.baseSPD)}" value="${response.baseStatus.baseSPD}"></progress>
                        </div>
                        <p class="progress-label">MAX ${maxStats(response.baseStatus.baseSPD)}</p>
                    </div>
                    <div class="progress-element progress-element--html" style = "display: inline-flex;">
                        <p class="progress-label">SPEED<br>${response.baseStatus.baseSpeed}</p>
                         <div class="progress-container">
                            <progress max="${maxStats(response.baseStatus.baseSpeed)}" value="${response.baseStatus.baseSpeed}"></progress>
                        </div>
                        <p class="progress-label">MAX ${maxStats(response.baseStatus.baseSpeed)}</p>
                    </div>
                </div>
                <div class = "local">Localization</div>
            </div>
            `;
           popup.innerHTML = infoHtml
        })

}

function closePopup(){
    const popup = document.getElementById("teste")
    popup.style.display = "none"
    content.setAttribute("style", "filter:brightness(1);")
    popup.innerHTML = ""
}

function maxHP (hpValue){
    return hpValue * 2 + 204
}

function maxStats(status){
    return Math.round((status * 2 + 99) * 1.1)
}
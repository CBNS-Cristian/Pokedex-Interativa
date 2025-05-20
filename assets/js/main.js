const pokeApi = {};

class Pokemon {
    numero;
    nome;
    imagem;
    altura;
    comprimento;
    tipoPrincipal;
    tipos = [];
}

function transformarVariavelPokemons(pokemonsDetalhes){
    const novoPokemon = new Pokemon()

    novoPokemon.numero = pokemonsDetalhes.order;
    novoPokemon.nome = pokemonsDetalhes.name;
    novoPokemon.imagem = pokemonsDetalhes.sprites.other.dream_world.front_default;
    novoPokemon.altura = pokemonsDetalhes.height;
    novoPokemon.comprimento = pokemonsDetalhes.weight;

    const tipos = pokemonsDetalhes.types.map((variosTipos) => variosTipos.type.name);
    const {tipo} = tipos

    novoPokemon.tipos = tipos
    novoPokemon.tipoPrincipal = tipo

    return novoPokemon
}
function converterPokemon(novoPokemon){
    return `<li class="pokemon ${novoPokemon.tipos[0]}">
                <div class="area-topo">
                        <div class="numeral">#${novoPokemon.numero}</div>
                        <div class="seta-abrir ${novoPokemon.tipos[0]}"></div>
                </div>

                <div class="fundo-imagem">
                <img src="${novoPokemon.imagem}" alt="${novoPokemon.nome}">
                <div class="fundo ${novoPokemon.tipos[0]}"></div>
                </div>

                <div class="informacoes">
                    <h3 class="name">${novoPokemon.nome}</h3>
                    <div class="extra-info">
                        <div>
                            <small>Peso</small>
                            <h5 class="comprimento">${novoPokemon.comprimento}</h5>
                        </div>
                        <div>
                            <small>Altura</small>
                            <h5 class="altura">${novoPokemon.altura}</h5>
                        </div>
                    </div>
                    <div class="area-tipo">
                        <small>Tipo: </small>
                        ${novoPokemon.tipos.map((tipos) => `<h5 class='type'> ${tipos} </h5>`).join(' / ')}
                    </div>
                </div>
            </li>`
            
}


const pokemonOl = document.getElementById('listaPokemon');

pokeApi.pegarDetalhes = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(transformarVariavelPokemons);
}

pokeApi.pegarPokemons = (offset = 0, limite = 20) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then(pokemons => pokemons.map(pokeApi.pegarDetalhes))
        .then((retornoDetalhes) => Promise.all(retornoDetalhes))
        .then((detalhesPokemon) => detalhesPokemon)
        .catch((error) =>{
            console.log(error);
        })
} 

pokeApi.pegarPokemons().then((pokemons = []) => {
            pokemonOl.innerHTML += pokemons.map(converterPokemon).join('');
        })

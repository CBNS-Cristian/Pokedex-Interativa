const pokeApi = {};

class Pokemon {
    numero;
    nome;
    id;
    imagem;
    altura;
    comprimento;
    tipoPrincipal;
    tipos = [];
}

function transformarVariavelPokemons({primeirosDetalhes, extrasDetalhes}){
    const novoPokemon = new Pokemon()

    // Variável das imagens
    const artOficial = primeirosDetalhes.sprites.other['official-artwork'].front_default
    const artSonhos = primeirosDetalhes.sprites.other.dream_world.front_default
    const artHome = primeirosDetalhes.sprites.other.home.front_default
    const artGif = primeirosDetalhes.sprites.other.showdown.front_default
    const artPequena = primeirosDetalhes.sprites.front_default

    novoPokemon.numero = primeirosDetalhes.order;
    novoPokemon.nome = primeirosDetalhes.name;
    novoPokemon.id = primeirosDetalhes.id;
    novoPokemon.imagem = artSonhos;
    novoPokemon.altura = primeirosDetalhes.height / 10;
    novoPokemon.comprimento = primeirosDetalhes.weight / 10;

    const tipos = primeirosDetalhes.types.map((variosTipos) => variosTipos.type.name);
    const {tipo} = tipos

    novoPokemon.tipos = tipos
    novoPokemon.tipoPrincipal = tipo

    // Status do Pokemon
    novoPokemon.hp = primeirosDetalhes.stats.find(response => response.stat.name === 'hp')?.base_stat
    novoPokemon.ataque = primeirosDetalhes.stats.find(response => response.stat.name === 'attack')?.base_stat
    novoPokemon.defesa = primeirosDetalhes.stats.find(response => response.stat.name === 'defense')?.base_stat
    novoPokemon.ataqueEs = primeirosDetalhes.stats.find(response => response.stat.name === 'special-attack')?.base_stat
    novoPokemon.defesaEs = primeirosDetalhes.stats.find(response => response.stat.name === 'special-defense')?.base_stat
    novoPokemon.velocidade = primeirosDetalhes.stats.find(response => response.stat.name === 'speed')?.base_stat

    const habilidadeGeral = primeirosDetalhes.abilities.map((response) => response.ability.name)
    const {habilidadePrincipal} = habilidadeGeral;

    novoPokemon.habilidade = habilidadePrincipal;
    novoPokemon.habilidades = habilidadeGeral;
    // Dados Extras, da segunda URL
    novoPokemon.descricao = extrasDetalhes.flavor_text_entries.find(response => response.language.name === 'en')?.flavor_text

    console.log(novoPokemon)
    return novoPokemon
}
function converterPokemon(novoPokemon){
    return `<li class="pokemon ${novoPokemon.tipos[0]}" id="${novoPokemon.id}">
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
        .then((primeirosDetalhes) => {
            return fetch(primeirosDetalhes.species.url)
                .then(response => response.json())
                .then(extrasDetalhes => {
                    return {
                        primeirosDetalhes,
                        extrasDetalhes
                    }
                })
        })
        .then(transformarVariavelPokemons)
  
}

pokeApi.pegarPokemons = (offset = 0, limite = 1 ) =>{
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

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

// JS Mudar Detalhes e Status


function transformarVariavelPokemons({primeirosDetalhes, extrasDetalhes}){
    const novoPokemon = new Pokemon()

    // Variável das imagens
    const artOficial = primeirosDetalhes.sprites.other['official-artwork'].front_default
    const artSonhos = primeirosDetalhes.sprites.other.dream_world.front_default
    const artHome = primeirosDetalhes.sprites.other.home.front_default
    const artGif = primeirosDetalhes.sprites.other.showdown.front_default
    const artPequena = primeirosDetalhes.sprites.front_default

    novoPokemon.numero = primeirosDetalhes.id;
    novoPokemon.nome = primeirosDetalhes.name;
    novoPokemon.id = primeirosDetalhes.id;
    novoPokemon.imagem = [artSonhos, artHome, artOficial, artGif, artPequena];
    novoPokemon.altura = primeirosDetalhes.height / 10;
    novoPokemon.comprimento = primeirosDetalhes.weight / 10;
    novoPokemon.experiencia = primeirosDetalhes.base_experience;

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
    novoPokemon.categoria = extrasDetalhes.genera.find(response => response.language.name === 'en')?.genus

    novoPokemon.descricao.split('\n').map(paragrafo => paragrafo.trim())

    novoPokemon.felicidade = extrasDetalhes.base_happiness  
    novoPokemon.habitate = extrasDetalhes.habitat?.name || 'unknown';
    return novoPokemon
}

function converterPokemonHero(pokemonHero){
    return `<div class="hero ${pokemonHero.tipos[0]}" id="${pokemonHero.id}">
            <div class="area-hero">
                <div class="hero-info">
                    <div class="seta-fechar"></div>
                    <div class="info">
                        <div class="number">#${pokemonHero.numero}</div>
                        <div class="name">${pokemonHero.nome}</div>
                    </div>
                </div>
                    <img src="${pokemonHero.imagem[2]}" alt="${pokemonHero.nome}">
                    <div class="fundo-img"></div>
            </div>

            <div class="detalhes-hero">
                <li>
                    <a href="#" id='detalhe-hero' class="active">Details</a>
                    <a href="#" id='status-hero'>Status</a>
                </li>
                <div class="sub-menu-dt">
                    <div class="detalhes-info">
                        <div class="altura"><span>Altura</span>${pokemonHero.altura}m</div>
                        <div class="peso"><span>Peso</span> ${pokemonHero.comprimento}Kg</div>
                        <div class="categoria"><span>Categoria</span> ${pokemonHero.categoria}</div>
                        <div class="altura"><span>Habilidade</span>${pokemonHero.habilidades[0]}</div>
                    </div>
                    
                    <p>${pokemonHero.descricao
                            .replace(/\n|\f/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim()
                    }</p>
                    
                   <div class="detalhes-info">
                        <div class="altura"><span>Felicidade Base</span>${pokemonHero.felicidade}</div>
                        <div class="peso"><span>Exper. Base</span> ${pokemonHero.experiencia}</div>
                        <div class="peso"><span>Habitate</span> ${pokemonHero.habitate}</div>
                    </div>
                </div>
                <div class="sub-menu-st">
                    <div class="hp">
                        <span class="progress-text">${pokemonHero.hp}</span>
                        <span>HP:</span> <progress value="${pokemonHero.hp}" max="255"></progress> 
                        <span class="progress-total"> 255</span>
                    </div>
                    <div class="atk">
                        <span class="progress-text">${pokemonHero.ataque}</span>
                        <span>ATK:</span> <progress value="${pokemonHero.ataque}" max="255"></progress>
                        <span class="progress-total"> 255</span>
                    </div>
                    <div class="def">
                        <span class="progress-text">${pokemonHero.defesa}</span>
                        <span>DEF:</span> <progress value="${pokemonHero.defesa}" max="255"></progress>
                        <span class="progress-total"> 255</span>
                    </div>
                    <div class="satk">
                        <span class="progress-text">${pokemonHero.defesaEs}</span>
                        <span>S.ATK:</span> <progress value="${pokemonHero.defesaEs}" max="255"></progress>
                        <span class="progress-total"> 255</span>
                    </div>
                    <div class="sdef">
                        <span class="progress-text">${pokemonHero.ataqueEs}</span>
                        <span>S.DEF:</span> <progress value="${pokemonHero.ataqueEs}" max="255"></progress>
                        <span class="progress-total"> 255</span>
                    </div>
                    <div class="spd">
                        <span class="progress-text">${pokemonHero.velocidade}</span>
                        <span>SPD:</span> <progress value="${pokemonHero.velocidade}" max="255"></progress>
                        <span class="progress-total"> 255</span>
                    </div>
                </div>

            </div>
        </div>`
}

function converterPokemon(novoPokemon){
    return `<li class="pokemon ${novoPokemon.tipos[0]}" id="${novoPokemon.id}">
                <div class="area-topo">
                        <div class="numeral">#${novoPokemon.numero}</div>
                        <div class="seta-abrir ${novoPokemon.tipos[0]}"></div>
                </div>

                <div class="fundo-imagem">
                <img src="${novoPokemon.imagem[0]}" alt="${novoPokemon.nome}">
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

// JS da Paginação

let paginaAtual = 1;
const itensPorPagina = 20;
let totalPaginas = 0;

function carregarPokemons(pagina = 1){
    const offset = (pagina - 1) * itensPorPagina;

    pokeApi.pegarPokemons(offset, itensPorPagina).then((pokemons = []) => {
            pokemonOl.innerHTML = pokemons.map(converterPokemon).join('');
            abrirPokemon.innerHTML = pokemons.map(converterPokemonHero).join('');
            
            paginaAtual = pagina;
            atualizarBotoesPagina()
            carregarHeroPokemon()
        })

}

function mudarStatusDetalhes() {
    
    function alternarAbas(e, abaClicada){
        e.preventDefault();

        const detalheHero = document.getElementById('detalhe-hero');
        const statusHero = document.getElementById('status-hero');
        const menuDetalhes = document.querySelector('.sub-menu-dt');
        const menuStatus = document.querySelector('.sub-menu-st');

        // Alternar classes active
            detalheHero.classList.toggle('active', abaClicada === 'detalhe');
            statusHero.classList.toggle('active', abaClicada === 'status');
            
            // Alternar exibição dos menus
                menuDetalhes.style.display = abaClicada === 'detalhe' ? 'flex' : 'none';
                menuStatus.style.display = abaClicada === 'status' ? 'flex' : 'none';
            }

        // Configurar event listeners quando o Pokémon Hero é aberto
        document.addEventListener('click', function(e) {
            // Verifica se clicou no link de detalhes
            if (e.target && e.target.id === 'detalhe-hero') {
                alternarAbas(e, 'detalhe');
            }
            
            // Verifica se clicou no link de status
            if (e.target && e.target.id === 'status-hero') {
                alternarAbas(e, 'status');
            }
        });
}

function carregarHeroPokemon(){
    const pokemonCardHero = document.querySelectorAll('.pokemon');

    pokemonCardHero.forEach(card => {
        card.addEventListener('click', (e) => {
            const pokemonCard = e.currentTarget;
            const pokemonId = parseInt(pokemonCard.id);
           
            pokeApi.pegarDetalhes({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/` })
                .then((pokemon) => {
                    openPokemonHero(pokemon);
                });
        });
    });

} 
function atualizarBotoesPagina(){
    const btnAnterior = document.querySelector('.botao-voltar');
    const btnProximo = document.querySelector('.botao-proximo');

    btnAnterior.disabled = paginaAtual === 1;
    btnProximo.disabled = paginaAtual === totalPaginas
    atualizarNumerosPaginas()
}

function atualizarNumerosPaginas(){
    const container = document.querySelector('#numeroDePaginas');
    container.innerHTML = '';

    let paginaInicial = Math.max(1, paginaAtual - 2);
    let paginaFinal = Math.min(totalPaginas, paginaAtual + 4);

    const mostrarPaginas = paginaFinal - paginaInicial;
    if(mostrarPaginas < 4 && paginaInicial > 1){
        paginaInicial = Math.max(1, paginaFinal - 4);
    }

    for(let i = paginaInicial; i <= paginaFinal; i++){
        const numeroPagina = document.createElement('div')
        numeroPagina.classList.add('numeroDePaginas');
        if(i === paginaAtual){
            numeroPagina.classList.add('active');
        }
        numeroPagina.textContent = i;
        numeroPagina.addEventListener('click', () => carregarPokemons(i))
        container.appendChild(numeroPagina);
    }
}

function iniciarPaginacao(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
        .then(response => response.json())
        .then(data => {
            console.log(`total de pokemons: ${data.count}`);
            totalPaginas = Math.ceil(data.count / itensPorPagina);
            carregarPokemons(1)
        })
}

document.querySelector('.botao-voltar').addEventListener('click', ()=>{
    if(paginaAtual > 1){
        return carregarPokemons( paginaAtual - 1)
    }
}); 
document.querySelector('.botao-proximo').addEventListener('click', ()=>{
    if(paginaAtual < totalPaginas){
        return carregarPokemons( paginaAtual + 1)
    }
}) 



document.addEventListener('DOMContentLoaded', ()=>{
    iniciarPaginacao();
    carregarHeroPokemon();

})
// 

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
const abrirPokemon = document.querySelector('.pokemon-hero');




// JS Para abrir e fechar o Pokemon Hero

const pokemonList = document.getElementById('listaPokemon');
const pokemonHeroContainer = document.querySelector('.pokemon-hero');
const closeButton = document.querySelector('.seta-fechar');
const body = document.body;

// Função para abrir o Pokémon Hero
function openPokemonHero(pokemonData) {

    const heroHTML = converterPokemonHero(pokemonData);
    pokemonHeroContainer.innerHTML = heroHTML;
    pokemonHeroContainer.style.display = 'flex'
    body.classList.add('no-scroll');
    console.log(pokemonData)
    window.scroll(0,0)
    document.querySelector('.seta-fechar').addEventListener('click', closePokemonHero);

    setTimeout(() => {
        mudarStatusDetalhes();
        
        // Definir o estado inicial (Detalhes visível)
        const menuDetalhes = document.querySelector('.sub-menu-dt');
        const menuStatus = document.querySelector('.sub-menu-st');
        if (menuDetalhes && menuStatus) {
            menuDetalhes.style.display = 'flex';
            menuStatus.style.display = 'none';
        }
    }, 50);
}

function closePokemonHero() {
    pokemonHeroContainer.style.display = 'none';
    body.classList.remove('no-scroll');
}

pokemonList.addEventListener('click', (e) => {
    
    const pokemonCard = e.target.closest('.pokemon');
    if (!pokemonCard) return;
    
    // Obter o ID do Pokémon clicado
    const pokemonId = parseInt(pokemonCard.id);

    // Encontrar os dados do Pokémon correspondente
    pokeApi.pegarPokemons().then((pokemons = []) => {
        const todosPokemons = pokemons
        const selectedPokemon = pokemons.find(p => p.id === pokemonId);
        if (selectedPokemon) {
            openPokemonHero(selectedPokemon);
        }

    });
});

// JS para buscar Pokemons



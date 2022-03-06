const poke_container = document.getElementById('poke_container');
const noOfPokemon = 52;

//-----colors for matching pokemon type------
const colors ={
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    water: '#DEF3FD',
    ground: '#fe7da',
    rock: '#d5d5d4,',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const main_type = Object.keys(colors);


//----fetching pokemons----

const fetchPokemon = async()=> {
    for(let i=1; i<=noOfPokemon; i++){
        await getPokemon(i);
    }
}

//-----fetching pokemons by id-----

const getPokemon = async poke_id=>{
    try{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke_id}`);
    const pokemon = await res.json();
    pokemonCard(pokemon);
    //console.log(pokemon);
    }catch(err){
        console.log(err);
    }
};

//-----function for fetching pokemon details-----

function pokemonCard(pokemon){
    const poke = document.createElement('div');
    poke.classList.add('pokemon');
    
    //----mapping the pokemon type according to name of type
    const poke_type = pokemon.types.map(el=>el.type.name);
    const type = main_type.find(type=>poke_type.indexOf(type) > -1); 

    const name = pokemon.name.toUpperCase();
   
    const pokeAbility = pokemon.abilities.map(ability=>ability.ability.name);
    
    const moves = pokemon.moves.map(move=>move.move.name);

    const color = colors[type];
    poke.style.backgroundColor = color;
   
    const weight = pokemon.weight;

    const pokeInnerHTML = `
		<div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.id
        }.png" alt="${name}" />
        </div>
        <div>
            <h2 class="name"> ${name}</h2>
        </div>
        <div>
            <h3 class="ability"><strong>Ability: <span>${pokeAbility[0]}</span></strong></h3>
        </div>
        <div>
            <h3 class="move"><strong>Move: <span>${moves[0]}</span></strong></h3>
        </div>
        <div>
            <h3 class="weight"><strong>Weight: <span>${weight}</span></strong></h3>
        </div>`;

	poke.innerHTML = pokeInnerHTML;

	poke_container.appendChild(poke);
}

fetchPokemon();
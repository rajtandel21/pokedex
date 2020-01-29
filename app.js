const pokemonName = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");
const stats = document.getElementById("stats");
const abilities = document.getElementById("abilities");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const type = document.getElementById("type");
const mainDisplay = document.getElementById("mainDisplay");

//object for pokemon type and what color to use for background
//maybe create array or colors for the bigPokeball colors as well
const typeColors = {
  fire: "#f56935",
  grass: "#629343",
  water: "#5cabc0"
};

//fetch pokemon with id 1 as default and display its details
const fetchPokemon = () => {
  let findPokemon = 1;
  fetch(`https://pokeapi.co/api/v2/pokemon/${findPokemon}`)
    .then(res => res.json())
    .then(data => {
      const pokemon = {
        name: data.name,
        id: data.id,
        weight: data.weight,
        height: data.height,
        image: data.sprites.front_default,
        type: data.types.map(type => {
          return type.type.name;
        }),
        abilities: data.abilities.map(ability => {
          return ability.ability.name;
        }),
        stats: data.stats.map(stat => {
          return stat.base_stat;
        })
      };
      setUpPokemon(pokemon);
    });
};

const setUpPokemon = pokemon => {
  let colorSelect;
  if (pokemon.type.length > 1) {
    colorSelect = typeColors[pokemon.type[1]];
  } else {
    colorSelect = typeColors[pokemon.type[0]];
  }
  mainDisplay.style.backgroundColor = `${colorSelect}`;
  pokemonImage.src = pokemon.image;
  pokemonName.innerHTML = `${pokemon.name} #${pokemon.id}`;
  weight.innerHTML = `${pokemon.weight / 10} kg`;
  height.innerHTML = `${pokemon.height * 10} cm`;
  type.innerHTML = pokemon.type.join(", ");
  const pokeStats = `
    <li>HP: ${pokemon.stats[5]}</li>
    <li>Attack: ${pokemon.stats[4]}</li>
    <li>Sp Attack: ${pokemon.stats[2]}</li>
    <li>Defence: ${pokemon.stats[3]}</li>
    <li>Sp Defence: ${pokemon.stats[1]}</li>
    <li>Speed: ${pokemon.stats[0]}</li>
    `;
  stats.innerHTML = pokeStats;
  abilities.appendChild(
    document.createTextNode(` ${pokemon.abilities.join(", ")}`)
  );
};

fetchPokemon();

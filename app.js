const pokemonName = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");
const stats = document.getElementById("stats");
const abilities = document.getElementsByClassName("abilities");
const weight = document.getElementsByClassName("weight");
const height = document.getElementsByClassName("height");
const type = document.getElementsByClassName("type");
const mainDisplay = document.getElementById("mainDisplay");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");

//for the pokeball entry page
const entryPokeball = document.getElementById("clickPokeball");
const openBtn = document.getElementById("openBtn");
const topPokeball = document.getElementById("top");
const bottomPokeball = document.getElementById("bottom");

openBtn.addEventListener("click", () => {
  topPokeball.style.transform = "translateY(-140%)";
  bottomPokeball.style.transform = "translateY(140%)";
  setTimeout(() => {
    entryPokeball.remove();
  }, 1200);
});

//object for pokemon type and what color to use for background
//maybe create array or colors for the bigPokeball colors as well
//18 types in total
const typeColors = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#f56935",
  grass: "#5C9836",
  water: "#5cabc0",
  electric: "#E5BD1D",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC"
};

let defaultPokemon = 1;
let currentPokemon = 1;

//fetch pokemon with id 1 as default and display its details
const fetchPokemon = findPokemon => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${findPokemon}`).then(res => {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return res.json().then(data => {
        let pokemon = {
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
        searchInput.placeholder = "Enter Pokemon name or Id";
      });
    } else {
      searchInput.placeholder = "Cannot find Pokemon. Try again";
    }
  });
};

const setUpPokemon = pokemon => {
  currentPokemon = pokemon.id;
  let colorSelect;
  if (pokemon.type.length > 1) {
    colorSelect = typeColors[pokemon.type[1]];
  } else {
    colorSelect = typeColors[pokemon.type[0]];
  }
  mainDisplay.style.backgroundColor = `${colorSelect}`;
  pokemonImage.src = pokemon.image;
  pokemonName.innerHTML = `${pokemon.name} #${pokemon.id}`;
  //Details display change depending on media query
  weight[0].innerHTML = `Weight: ${pokemon.weight / 10} kg`;
  weight[1].innerHTML = `Weight: ${pokemon.weight / 10} kg`;
  height[0].innerHTML = `Height: ${pokemon.height * 10} cm`;
  height[1].innerHTML = `Height: ${pokemon.height * 10} cm`;
  type[0].innerHTML = `Type: ${pokemon.type.join(", ")}`;
  type[1].innerHTML = `Type: ${pokemon.type.join(", ")}`;
  let pokeStats = `
    <li>HP: ${pokemon.stats[5]}</li>
    <li>Attack: ${pokemon.stats[4]}</li>
    <li>Sp Attack: ${pokemon.stats[2]}</li>
    <li>Defence: ${pokemon.stats[3]}</li>
    <li>Sp Defence: ${pokemon.stats[1]}</li>
    <li>Speed: ${pokemon.stats[0]}</li>
    `;
  stats.innerHTML = pokeStats;
  abilities[0].innerHTML = `Abilities: ${pokemon.abilities.join(", ")}`;
  abilities[1].innerHTML = `Abilities: ${pokemon.abilities.join(", ")}`;
};

fetchPokemon(defaultPokemon);

searchInput.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    searchPokemon();
    searchInput.value = "";
  }
});

searchBtn.addEventListener("click", () => {
  if (searchInput.value == "") {
    searchInput.placeholder = "Please enter Pokemon Name or ID";
  } else {
    searchPokemon();
    searchInput.value = "";
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPokemon >= 807) {
    fetchPokemon(currentPokemon);
  } else {
    currentPokemon++;
    fetchPokemon(currentPokemon);
  }
});

previousBtn.addEventListener("click", () => {
  if (currentPokemon <= 1) {
    fetchPokemon(currentPokemon);
  } else {
    currentPokemon--;
    fetchPokemon(currentPokemon);
  }
});

let searchPokemon = () => {
  fetchPokemon(searchInput.value);
};

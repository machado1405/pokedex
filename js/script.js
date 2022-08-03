// Variáveis globais
const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (apiResponse.status === 200) {
    const apiJson = await apiResponse.json();

    return apiJson;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Buscando...';
  const data = await fetchPokemon(pokemon);
  pokemonId.innerHTML = '';
  if (data) {
    pokemonImage.style.display = 'inline-block';
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = `${data.id} -`;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated['front_default'];
  
    input.value = '';
    searchPokemon = data.id;
  }else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não encontrado';
    pokemonId.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
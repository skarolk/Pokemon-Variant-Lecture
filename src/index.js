// 1. We need access to the search bar
// 2. We need access to where we will render the pokemon
// 3. We need to get all the pokemon
// 4. We need to render html for all of the pokemon
// 5. We need to figure out which pokemon we are clicking
// 6. We need to change the front sprite to the back sprite on click
// 7. We need to capture the search value
// 8. We need to find the pokemon who match the search
// 9. We need to display only those pokemon

document.addEventListener("DOMContentLoaded", () => {
  /*********************** DOM Selectors ****************************************/
  // const pokemonContainer = document.querySelector("#pokemon-container");
  // const pokemonSearchForm = document.querySelector("#pokemon-search-form");
  console.log(POKEMON);
  const pokemonContainer = document.getElementById("pokemon-container");
  const pokemonSearchForm = document.getElementById("pokemon-search-form");

  /*********************** Initial Render ***************************************/
  pokemonContainer.innerHTML = renderAllPokemon(POKEMON); //add all pokemon to page on initial page load

  /************************ Event Listeners *************************************/
  pokemonContainer.addEventListener("click", e => {
    if (e.target.dataset.action === "flip") {
      // console.log("I'm clicking here!!!");
      // console.log(e.target.src);

      const targetPokemon = POKEMON.find(pokemon => {
        // == checks for value, === also checks for operand
        // console.log(typeof pokemon.id);
        // console.log(typeof e.target.dataset.id);
        // return pokemon.id == e.target.dataset.id;
        return pokemon.id === parseInt(e.target.dataset.id);
      });
      console.log(targetPokemon);

      // flip pokemon backwards
      if (e.target.src === targetPokemon.sprites.front) {
        e.target.src = targetPokemon.sprites.back;
      } else {
        // flip pokemon forward
        e.target.src = targetPokemon.sprites.front;
      }
    }
  });

  pokemonSearchForm.addEventListener("input", e => {
    console.log(e.target.value);
    // get array of pokemon we want
    let pokemonSearch = POKEMON.filter(pokemon => {
      return pokemon.name.includes(e.target.value.toLowerCase());
    });
    console.log(pokemonSearch);
    // update displayed pokemon
    pokemonContainer.innerHTML = renderAllPokemon(pokemonSearch);
  });
});

/************************* Helper Fns for Producing HTML **********************/
function renderAllPokemon(pokemons) {
  return pokemons
    .map(pokemon => {
      // console.log(pokemon.name);
      return `
      <div class="pokemon-card">
        <div class="pokemon-frame">
          <h1 class="center-text">${pokemon.name}</h1>
          <div class="pokemon-image">
            <img data-id="${
              pokemon.id
            }" data-action="flip" class="toggle-sprite" src="${
        pokemon.sprites.front
      }">
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

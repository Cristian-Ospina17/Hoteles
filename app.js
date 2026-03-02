// Feature 2 - Consumo de la API Pokémon

async function obtenerPokemones() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10";

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        return data.results;

    } catch (error) {
        console.error("Error al consumir la API:", error);
    }
}


// Feature 4 - Mostrar con Bootstrap Grid

function mostrarPokemones(pokemones) {
    const contenedor = document.getElementById("pokemon-container");

    pokemones.forEach((pokemon, index) => {

        const card = `
        <div class="col-md-4 col-sm-6 col-12">
            <div class="card shadow-sm h-100">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png"
                     class="card-img-top p-3"
                     alt="${pokemon.name}">
                <div class="card-body text-center">
                    <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                </div>
            </div>
        </div>
        `;

        contenedor.innerHTML += card;
    });
}


// Ejecutar cuando cargue la página
document.addEventListener("DOMContentLoaded", async () => {
    const pokemones = await obtenerPokemones();
    mostrarPokemones(pokemones);
});
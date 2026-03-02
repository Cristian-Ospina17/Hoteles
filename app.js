// ==============================
// Feature 5 - Renderizado Final
// Integración y optimización
// ==============================


// Obtener lista base de Pokémon
async function obtenerPokemones() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10";

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    return data.results;
}


// Obtener detalles individuales (procesamiento real de datos)
async function obtenerDetalles(pokemones) {
    const promesas = pokemones.map(pokemon =>
        fetch(pokemon.url).then(res => {
            if (!res.ok) {
                throw new Error("Error al obtener detalles");
            }
            return res.json();
        })
    );

    return Promise.all(promesas);
}


// Renderizar en el DOM
function renderizarPokemones(pokemones) {
    const contenedor = document.getElementById("pokemon-container");

    // Limpiar antes de renderizar
    contenedor.innerHTML = "";

    pokemones.forEach(pokemon => {

        const columna = document.createElement("div");
        columna.className = "col-md-4 col-sm-6 col-12";

        columna.innerHTML = `
            <div class="card shadow-sm h-100">
                <img src="${pokemon.sprites.front_default}"
                     class="card-img-top p-3"
                     alt="${pokemon.name}">
                <div class="card-body text-center">
                    <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                </div>
            </div>
        `;

        contenedor.appendChild(columna);
    });
}


// Inicialización principal
async function iniciarAplicacion() {
    try {
        const listaBase = await obtenerPokemones();
        const detalles = await obtenerDetalles(listaBase);
        renderizarPokemones(detalles);

    } catch (error) {
        console.error("Error general:", error);

        document.getElementById("pokemon-container").innerHTML = `
            <div class="alert alert-danger text-center">
                No se pudieron cargar los Pokémon.
            </div>
        `;
    }
}


document.addEventListener("DOMContentLoaded", iniciarAplicacion);
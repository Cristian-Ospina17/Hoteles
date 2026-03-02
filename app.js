// Feature 2 - Consumo de la API Pokémon

async function obtenerPokemones() {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10";

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`);
        }

        const data = await respuesta.json();

        console.log("Pokemones obtenidos:", data.results);

        return data.results;

    } catch (error) {
        console.error("Error al consumir la API:", error);
    }
}
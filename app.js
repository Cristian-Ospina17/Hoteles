async function obtenerPokemones() {
    try {
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const data = await respuesta.json();

        const pokemonesProcesados = await Promise.all(
            data.results.map(async (pokemon) => {
                const detalleRespuesta = await fetch(pokemon.url);
                const detalle = await detalleRespuesta.json();

                return {
                    id: detalle.id,
                    nombre: detalle.name,
                    imagen: detalle.sprites.front_default,
                    tipos: detalle.types.map(t => t.type.name)
                };
            })
        );

        console.log(pokemonesProcesados);
        return pokemonesProcesados;

    } catch (error) {
        console.error("Error:", error);
    }
}

obtenerPokemones();
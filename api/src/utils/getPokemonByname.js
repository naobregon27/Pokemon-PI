const axios = requiere("axios")

async function getPokemonByName(name) {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        if (!data) throw new Error('No hay Pokemons con este nombre');

        const pokemon = {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default,
            life: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'hp').base_stat,
            attack: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'attack').base_stat,
            defense: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'defense').base_stat,
            speed: pokemonInfo.stats.find((attribute) => attribute.stat.name === 'speed').base_stat,
            height: data.height,
            weight: data.weight,
            types: pokemonInfo.types.map(({ type }) => {
                const id = Number.parseInt(type.url.slice(31));
                const { name } = type;
                return { id, name };
            }),
        };
        return pokemon;
    } catch (error) {
        if (error.data && error.data.status === 404) {
            console.log(error.data)
            throw new Error('No existe este pokemon');
        }
        throw error;
    }
};

async function getPokemonByNameBD(name) {

    if (name) {

        let pokemon = await Pokemon.findAll({
            where: { name: name },
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
        return pokemon
    }


}

module.exports = {
    getPokemonByName,
    getPokemonByNameBD
}
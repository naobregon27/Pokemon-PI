const axios = require("axios")
const { Pokemon, type } = require("../db")

const getPokemonById = async (id) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

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
     }

     return pokemon;

}

async function getPokemonByIdBS(id){

    let pokemon = await Pokemon.findAll({
        where:{id:id},
        include:{
            model: Type,
            attributes:["name"],
            through: {
                attributes:[]
            }
        }
    })
    return pokemon
    
}

module.exports = {
    getPokemonById,
    getPokemonByIdBS,
}
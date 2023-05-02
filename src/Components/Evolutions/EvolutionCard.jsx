import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgTypes from '../data.json'
import './evolutionStyle.css'

const EvolutionCard = ({ id }) => {
    const [evolvesChain, setEvolvesChain] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);
    const navigate = useNavigate()

    // get evolutions chain of pokemon and set a array with the current data.
    const getData = async (id) => {
        const evolvesChainUrls = [];
        await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}/?include=1`)
                .then( res => {
                    if(res.data.chain.evolves_to.length > 0){
                        // Get Url of current pokemon.
                        evolvesChainUrls.push(res.data.id);
                        // get next pokemon evolution chain and url
                        if (res.data.chain.evolves_to?.length > 0) {
                            res.data.chain.evolves_to?.forEach((evolution) => {
                                evolvesChainUrls.push(evolution.species.name);
                                // check if have more evolves.
                                if (evolution.evolves_to?.length > 0) {
                                    evolution.evolves_to?.forEach((additionalEvolution) => {
                                        evolvesChainUrls.push(additionalEvolution.species.name);
                                    });
                                }
                            });
                        }
                        setEvolvesChain(evolvesChainUrls);
                    }
                    else{
                        setEvolvesChain([]);
                    }

                })
                .catch( (error) => console.log(error.message))
    };

    // Make request and get pokemon data to add them to array evolves chain
    const pushPokemons = async () => {
        // Promisa.all return a array with all response data of multiples requests.
        // Promise.all waiting for response of every request before seting datas values
        const datas = await Promise.all(
            evolvesChain?.map(async (name) => {
                    try {
                        const res = await axios.get(` https://pokeapi.co/api/v2/pokemon/${name}/`)
                        return res.data
                    }
                    catch (error) {
                        console.log(error);
                    }
                })
            )

        setPokemonData(datas)
    }

    const getBgByType = (type) => {
        let bg;
        bgTypes.backgrounds.forEach(typeJson => {
            if (typeJson.name == type) {
                bg = `url("${typeJson.url}")`;

            }
        })
        return bg;
    }

    useEffect( () =>{
        getData(id)
    },[id])


    useEffect( () =>{
        if (evolvesChain.length > 0 && evolvesChain[0] == id) {
            pushPokemons()
        }
    },[evolvesChain, id])

    return (
        <div className="evolves">
            <h2>Evolutions</h2>
            <div className="evolution_container">
                {
                    pokemonData.map(pokemon => (
                        <div
                            className="evolve_card"
                            key={pokemon.id}
                            onClick={() => navigate(`/pokemons/${pokemon.name}`)}
                            style={{
                                backgroundImage: getBgByType(pokemon.types[0].type.name)
                            }}
                        >
                            <div className="evolve_header">
                                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }</h3>
                                <span># {pokemon.id}</span>
                            </div>
                            <div className="sprite_container">
                                <img
                                    src={
                                        pokemon.sprites.other.dream_world.front_default ?
                                        pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_default
                                    }
                                    alt={pokemon.name}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default EvolutionCard;
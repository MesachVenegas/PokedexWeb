import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './evolutionStyle.css'

const EvolutionCard = ({ id, bg }) => {
    const [evolvesChain, setEvolvesChain] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);
    const navigate = useNavigate()

    // get evolutions chain of pokemon and set a array with the current data.
    const getData = async (id) => {
        const evolvesChainUrls = [];
        await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}/?include=1`)
                .then( res => {
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

    useEffect( () =>{
        getData(id)
    },[id])


    useEffect( () =>{
        if (evolvesChain.length > 0) {
            pushPokemons()
        }
    },[evolvesChain])

    return (
        <div className="evolution_container">
            <h2>Evolutions</h2>
            {
                pokemonData.map(pokemon => (
                    <div
                        className="evolve_card"
                        key={pokemon.id}
                        onClick={() => navigate(`/pokemons/${pokemon.name}`)}
                        style={{
                            backgroundImage: bg
                        }}
                    >
                        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }</h3>
                        <img
                            src={
                                pokemon.sprites.other.dream_world.front_default ?
                                pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_default
                            }
                            alt={pokemon.name}
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default EvolutionCard;
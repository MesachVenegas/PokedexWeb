import axios from "axios";
import { useEffect, useState } from "react";

const EvolutionCard = ({ id }) => {
    const [evolvesChain, setEvolvesChain] = useState()


    const getData = async (id) => {
        if (id) {
            await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
                .then((res) => {
                    const evolvesChainUrls = [];

                    // Get Url of actual pokemon.
                    evolvesChainUrls.push(res.data.chain.species.url);

                    // get next pokemon evolution chain and url
                    if (res.data.chain.evolves_to?.length > 0) {
                        res.data.chain.evolves_to?.forEach(evolution => {
                            evolvesChainUrls.push(evolution.species.url);

                            // check if have more evolves.
                            if (evolution.evolves_to?.length > 0) {
                                evolution.evolves_to?.forEach(additionalEvolution => {
                                    evolvesChainUrls.push(additionalEvolution.species.url);
                                });
                            }
                        });
                    }

                    setEvolvesChain(evolvesChainUrls);
                })
                .catch((err) => console.error(err));
        }
    }


    useEffect( () =>{
        getData(id);
    },[id])


    const loadEvolves = async () => {
        if(!evolvesChain){
            getData(id)
        }

        evolvesChain?.map( async (url) => {
            await axios.get(url)
                .then( res => {
                    console.log(res.data)
                })
        })

    }

    loadEvolves()

    return (
        <div className="evolution_container">
            <h2>Evolutions</h2>
        </div>
    );
};

export default EvolutionCard;
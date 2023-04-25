import axios from "axios";
import { useEffect } from "react";

const EvolutionCard = ({ id }) => {

    const getData = async (id) => {
        await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }

    useEffect( () =>{
        getData(id);
    })

    return (
        <div className="evolution_container">
            <h2>Evolutions</h2>
        </div>
    );
};

export default EvolutionCard;
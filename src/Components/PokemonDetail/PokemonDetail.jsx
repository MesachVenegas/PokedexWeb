import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {
    const { name } = useParams();


    return (
        <div>
            <h1>Detalle del Pokemon {name}</h1>
        </div>
    );
};

export default PokemonDetail;
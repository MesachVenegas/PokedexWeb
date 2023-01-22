import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import './pokemoncard.css'

const PokemonCard = ({ pokemon }) => {
    const [data, setData] = useState({})
    const [types, setTypes] = useState('')

    useEffect( () =>{
        if(pokemon){
            axios.get(pokemon.url)
                .then( res => setData(res.data))
                .catch( res => console.log(res))

        }
    },[pokemon])

    const loadTypes = () =>{
        const long = data.types?.length;
    }

    loadTypes()
    return (
        <div className='pokemon_card'>
            <h3>{data.name}</h3>
            <div className="data_container">
                <ul className='pokemon_data'>
                    <li>Types: </li>
                    <li>Hp: </li>
                    <li>Attack: </li>
                    <li>Defense: </li>
                    <li>Speed: </li>
                </ul>
                <figure className='pokemon_sprite'>
                    <img src={data.sprites?.front_default} alt="sprite-pokemon" />
                </figure>
            </div>
        </div>
    );
};

export default PokemonCard;
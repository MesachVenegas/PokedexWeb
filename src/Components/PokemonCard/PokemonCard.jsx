import React from 'react';
import './pokemoncard.css'

const PokemonCard = () => {
    return (
        <div className='pokemon_card'>
            <h3>Pokemon Name</h3>
            <div className="data_container">
                <ul className='pokemon_data'>
                    <li>Types: </li>
                    <li>Hp: </li>
                    <li>Attack: </li>
                    <li>Defense: </li>
                    <li>Speed: </li>
                </ul>
                <figure className='pokemon_sprite'>
                    <img src="" alt="sprite-pokemon" />
                </figure>
            </div>
        </div>
    );
};

export default PokemonCard;
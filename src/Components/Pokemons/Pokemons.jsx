import PokemonCard from '../PokemonCard/PokemonCard';
import logo from '../../assets/imgs/pokemon-logo.png'
import React from 'react';
import axios from 'axios'
import './pokemons.css'

const Pokemons = () => {



    return (
        <div className='pokemons_container'>
            <div className="header">
                <img src={logo} alt="pokemon_logo" className='logo'/>
                <h2>Listado de pokemons</h2>

            </div>

            <div className="cards_container">
                <PokemonCard />
            </div>
        </div>
    );
};

export default Pokemons;
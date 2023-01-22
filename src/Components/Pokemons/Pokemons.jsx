import PokemonCard from '../PokemonCard/PokemonCard';
import logo from '../../assets/imgs/pokemon-logo.png'
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios'
import './pokemons.css'

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([])

    const getPokemons = () =>{
        // https://pokeapi.co/api/v2/pokemon/{id or name}/
        axios.get('https://pokeapi.co/api/v2/pokemon/')
            .then(res => setPokemons(res.data))
            .catch(res => console.log(res))
    }

    useEffect( () =>{
        getPokemons()
    },[])

    return (
        <div className='pokemons_container'>
            <div className="header">
                <img src={logo} alt="pokemon_logo" className='logo'/>
                <h2>Listado de pokemons</h2>

            </div>

            <div className="cards_container">
                {
                    pokemons.results?.map(pokemon =>(
                        <PokemonCard key={pokemon.name} pokemon={pokemon} />
                    ))
                }
            </div>
        </div>
    );
};

export default Pokemons;
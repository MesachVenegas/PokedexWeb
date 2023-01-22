import PokemonCard from '../PokemonCard/PokemonCard';
import logo from '../../assets/imgs/pokemon-logo.png'
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios'
import './pokemons.css'

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([])
    const [pagination, setPagination] = useState(null)
    const [next, setNext] = useState("")

    const getPokemons = () =>{
        // https://pokeapi.co/api/v2/pokemon/{id or name}/
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=18')
            .then(res =>{
                setPokemons(res.data)
                console.log(res.data);
            })
            .catch(res => console.log(res))
    }

    useEffect( () =>{
        getPokemons()
    },[])
    console.log(pagination);

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
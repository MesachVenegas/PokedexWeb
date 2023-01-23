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
    const [change, setChange] = useState(false)
    const [title, setTitile] = useState("")

    const getPokemons = async () =>{
        await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=18')
            .then(res =>{
                setPokemons(res.data)
            })
            .catch(error => console.log(error))
    }

    const getPokemonsByType = async () =>{
        await axios.get('https://pokeapi.co/api/v2/type/1/')
            .then(res =>{
                setPokemons(res.data.pokemon)
                setChange(true)
            })
            .catch( error => console.log( error))
    }

    const loadPokemons = () =>{
        if (!change) {
            return pokemons.results?.map(pokemon => {
                return(<PokemonCard key={pokemon.name} pokemon={pokemon} />)
            })
        } else {
            return pokemons?.map(data => {
                const info = data?.pokemon
                return(<PokemonCard key={info?.name} pokemon={info} />)
            })
        }
    }

    useEffect( () =>{
        // getPokemons()
        getPokemonsByType()
    },[])


    return (
        <div className='pokemons_container'>
            <div className="header">
                <img src={logo} alt="pokemon_logo" className='logo'/>
                <h2>Listado de pokemons</h2>

            </div>

            <div className="cards_container">
                { loadPokemons() }
            </div>
        </div>
    );
};

export default Pokemons;
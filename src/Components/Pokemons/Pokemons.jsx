import PokemonCard from '../PokemonCard/PokemonCard';
import logo from '../../assets/imgs/pokemon-logo.png'
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios'
import './pokemons.css'

const Pokemons = () => {
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [change, setChange] = useState(false)
    const [type, setType] = useState("")
    const [toSearch, setToSearch] = useState('')


    const getPokemons = async () =>{
        await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=18')
            .then(res =>{
                setPokemons(res.data)
            })
            .catch(error => console.log(error))
    }

    const getPokemonTypes = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/type/`)
        .then( res => setPokemonTypes(res.data.results))
        .catch( error => console.log(error))
    }

    // Obtengo el listado de pokemons por tipo
    const getPokemonsByType = async (type) =>{
        await axios.get(`https://pokeapi.co/api/v2/type/${type}/`)
            .then(res =>{
                setPokemons(res.data.pokemon)
                setChange(true)
            })
            .catch( error => console.log( error))
    }

    const searchPokemon = async (name) =>{
        console.log(name)
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            .then( res => console.log(res.data))
            .catch(error => console.log(error))
    }

    // se encarga del renderizado de la lista de pokemon según el termino de busqueda.
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
        getPokemonTypes()
        if(type){
            getPokemonsByType(type)
        }else{
            getPokemons()
        }
    },[type])


    return (
        <div className='pokemons_container'>
            <div className="header">
                <div className="header">
                    <img src={logo} alt="pokemon_logo" className='logo'/>
                    <h2>Welcome! Trainer name</h2>
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label>
                    <input
                        id='search'
                        type="search"
                        value={toSearch}
                        placeholder='Name or Id'
                        onChange={e => setToSearch(e.target.value)}
                    />
                    <button onClick={ () => searchPokemon(toSearch) }>Search</button>
                </div>
                <div className="filter_bar">
                    <label htmlFor="types">Filter by Types: </label>
                    <select id="types" onChange={e => setType(e.target.value)}>
                        <option key='default_option' value={null} defaultChecked>Seleccionar</option>
                        {
                            pokemonTypes?.map( type =>(
                                <option key={type.name} value={type.name}>{type.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="cards_container">
                { loadPokemons() }
            </div>
        </div>
    );
};

export default Pokemons;
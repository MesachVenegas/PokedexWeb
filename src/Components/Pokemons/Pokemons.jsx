import PokemonCard from '../PokemonCard/PokemonCard';
import Loading from '../Loading/Loading';
import logo from '../../assets/imgs/pokemon-logo.png'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'
import './pokemons.css'

const Pokemons = () => {
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [change, setChange] = useState(false)
    const [type, setType] = useState("")
    const [toSearch, setToSearch] = useState('')
    const [toShow, setToShow] = useState(null)

    const userName = useSelector(state => state.userName);

    // Search pokemon by name or id.
    // const searchPokemon= async () =>{
    //     await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1300')
    //         .then(res => {
    //             res.data.results?.forEach(pokemon => {
    //                 console.log(pokemon);
    //             })
    //         })
    //         .catch(error => console.log(error))
    // }
    // Trae el total de pokemons disponibles.
    const getPokemons = async () =>{
        // ?offset=0&limit=1279
        await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=21')
            .then(res =>{
                setPokemons(res.data)
            })
            .catch(error => console.log(error))
    }
    // Se encarga de traer el listado de tipos de pokemon disponibles.
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

    // se encarga del renderizado de la lista de pokemon según el termino de busqueda.
    const loadPokemons = () =>{
        if (toShow) {
            return ( <PokemonCard key={toSearch} pokemon={null} searchResult={toShow} /> )
        }else if(!change) {
            if(!pokemons){
                return pokemons.results?.map(pokemon => {
                    return(<PokemonCard key={pokemon.name} pokemon={pokemon} searchByName={null} />)
                })
            }else{
                return( <Loading />)
            }
        } else {
            return pokemons?.map(data => {
                const info = data?.pokemon
                return (<PokemonCard key={info?.name} pokemon={info} searchByName={null} />)
            })
        }
    }

    useEffect( () =>{
        // Get a list of exist types.
        getPokemonTypes()
        // Verificar si se muestran todos los pokemons o solo se mostraran los filtrados por el tipo de pokemon.
        if(type) {
            getPokemonsByType(type)
        }else {
            getPokemons()
        }
    },[ type ])

    /*
    <label for="file">File progress:</label>
    <progress id="file" max="100" value="70"> 70% </progress>
    */

    return (
        <div className='pokemons_container'>
            <div className="header">
                <div className="header">
                    <img src={logo} alt="pokemon_logo" className='logo'/>
                    <h2>Welcome! { userName } here you can find your favorite pokemon</h2>
                </div>
                {/* Search bar by pokemon name or id */}
                <div className="search">
                    <label htmlFor="search">Search </label>
                    <input
                        id='search'
                        type="search"
                        value={toSearch}
                        placeholder='Name or Id'
                        onChange={e => setToSearch(e.target.value)}
                    />
                    <button onClick={ () => searchPokemon() }>Search</button>
                </div>
                {/* Filter pokemons by types */}
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
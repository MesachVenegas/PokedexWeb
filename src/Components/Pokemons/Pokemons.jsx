import logo from '../../assets/imgs/pokemon-logo.png';
import bg_vector from '../../assets/imgs/pokeball.svg';
import PokemonCard from '../PokemonCard/PokemonCard';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'
import './pokemons.css'

const Pokemons = () => {
    const navigate = useNavigate();
    const userName = useSelector(state => state.userName);
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [change, setChange] = useState(false)
    const [type, setType] = useState("")
    const [toSearch, setToSearch] = useState('')
    const [loader, setLoader] = useState(false)


    const getPokemons = async () =>{
        await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279')
            .then(res =>{
                setPokemons(res.data.results)
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
        if(!change) {
            return pokemons?.map(pokemon => {
                return(<PokemonCard key={pokemon.name} pokemon={pokemon} searchByName={null} />)
            })
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


    return (
        <div className='pokemons_container'>
            {/* <img src={bg_vector} alt="pokebal_vector" className='bg_vector'/> */}
            <div className="header">
                {/* Titulo del complemento */}
                <div className="header_title">
                    <img src={logo} alt="pokemon_logo" className='logo'/>
                    <h2>Welcome! { userName } here you can find your favorite pokemon</h2>
                </div>
                <div className="subheader">
                    {/* Search bar by pokemon name or id */}
                    <div className="search_container">
                        <input
                            id='search'
                            type="search"
                            value={toSearch}
                            placeholder='Name or Id'
                            onChange={e => setToSearch(e.target.value.toLowerCase())}
                        />
                        <button onClick={ () => navigate(`/pokemons/${toSearch}`) }>Search</button>
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
                <div className="pagination_container">
                    <button>Prev</button>
                    <ul className='pagination_menu'>
                    </ul>
                    <button>Next</button>
                </div>
            </div>

            <div className="cards_container">
                { pokemons ? loadPokemons() : <Loading /> }
            </div>
        </div>
    );
};

export default Pokemons;
import PokemonCard from '../PokemonCard/PokemonCard'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './pokemons.css'
import NavigationBar from '../NavigationBar/NavigationBar';
import FootBar from '../FootBar/FootBar';

const Pokemons = () => {
    const navigate = useNavigate();
    const [pokemons, setPokemons] = useState([])
    const [toSearch, setToSearch] = useState('')
    const [pokemonTypes, setPokemonTypes] = useState([])
    const [page, setPage] = useState(1);
    const [type, setType] = useState('')
    const [lastPage, setLastPage] = useState(0)
    const [change, setChange] = useState(false) // switching style to read data of response API
    const [typeTitle, setTypeTitle] = useState('')
    let toShow = [];
    let perPage = 20;
    let end = page * perPage;
    let start = end - perPage;
    toShow = pokemons?.slice(start, end);

    // Trae todos los pokemons disponibles.
    const getPokemons = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279`)
            .then(res =>{
                setTypeTitle('ALL')
                setPokemons(res.data.results)
                setLastPage(Math.ceil(res.data.results?.length / perPage));
                setPage(1)
            })
            .catch(error => console.log(error))
    }

    // Obtengo el listado de pokemons por tipo
    const getPokemonsByType = async (type) => {
        if(type != 'all'){
            await axios.get(`https://pokeapi.co/api/v2/type/${type}/`)
                .then(res =>{
                    setTypeTitle(type ? type : 'all')
                    setPokemons(res.data.pokemon)
                    setLastPage(Math.ceil(res.data.pokemon?.length / perPage));
                    setChange(true)
                    setPage(1)
                })
                .catch( error => console.log( error))
        }else{
            setChange(false)
            getPokemons()
        }
    }

    // se encarga del renderizado de la lista de pokemon según el termino de busqueda.
    const loadPokemons = () =>{
        // setLastPage(Math.ceil(pokemons?.length / perPage));
        if(!change) {
            return toShow?.map(pokemon => {
                return(<PokemonCard key={pokemon.name} pokemon={pokemon} />)
            })
        } else {
            return toShow.map(data => {
                return (<PokemonCard key={data?.pokemon.name} pokemon={data?.pokemon} />)
            })
        }
    }

    // get list of pokemon types availables.
    const getPokemonTypes = async () => {
        await axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setPokemonTypes(res.data.results))
            .catch(error => console.log(error))
    }

    // Capitalize pokemon types and create option list for filter.
    const capTypeName = () => {
        return pokemonTypes?.map(type => {
            return (
                <option key={type.name} value={type.name}>
                    {type.name?.charAt(0)?.toUpperCase() + type.name?.slice(1)}
                </option>
            )
        })
    }

    useEffect( () =>{
        // get all possible types of pokemons.
        getPokemonTypes()
        // change the page title.
        if(document.title !== 'Pokedex | Home'){
            document.title = 'Pokedex | Home'
        }

        // Verificar si se muestran todos los pokemons o solo se mostraran los filtrados por el tipo de pokemon.
        if(type) {
            getPokemonsByType(type)
        } else {
            getPokemons()
        }
    },[ type ])


    return (
        <div className='pokemons_container'>
            <NavigationBar />
            <div className="filters_container">
                <div className="subheader">
                    <div className="search_container">
                        <input id='search' type="search" value={toSearch} placeholder='Name or Id' onChange={e => setToSearch(e.target.value.toLowerCase())} />
                        <button onClick={() => navigate(`/pokemons/${toSearch}`)}>Search</button>
                    </div>
                    <div className="filter_bar">
                        <label htmlFor="types">Filter by Types: </label>
                        <select id="types" onChange={ e => setType(e.target.value)} >
                            <option key='default_option' value='all' defaultChecked>All</option>
                            { capTypeName() }
                        </select>
                    </div>
                </div>
            </div>

            <div className="pagination_container">
                <div className="navigation">
                    <button onClick={() => setPage(1)} disabled={page === 1} > <i className="fa-solid fa-angles-left"></i> </button>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} > <i className="fa-solid fa-chevron-left"></i> </button>
                    <span>{page}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page === lastPage} > <i className="fa-solid fa-chevron-right"></i> </button>
                    <button onClick={() => setPage(lastPage)} disabled={page === lastPage} > <i className="fa-solid fa-angles-right"></i> </button>
                </div>
            </div>

            <h2>{typeTitle.toUpperCase()}</h2>
            <div className="cards_container">
                { loadPokemons() }
            </div>

            <div className="pagination_container">
                <div className="navigation">
                    <button onClick={() => setPage(1)} disabled={page === 1} > <i className="fa-solid fa-angles-left"></i> </button>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} > <i className="fa-solid fa-chevron-left"></i> </button>
                    <span>{page}</span>
                    <button onClick={() => setPage(page + 1)} disabled={page === lastPage} > <i className="fa-solid fa-chevron-right"></i> </button>
                    <button onClick={() => setPage(lastPage)} disabled={page === lastPage} > <i className="fa-solid fa-angles-right"></i> </button>
                </div>
            </div>

            <FootBar />
        </div>
    );
};

export default Pokemons;
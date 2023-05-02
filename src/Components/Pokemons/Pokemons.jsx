import PokemonCard from '../PokemonCard/PokemonCard'
import { useEffect, useState } from 'react';
import axios from 'axios'
import './pokemons.css'

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([])
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0)
    const [change, setChange] = useState(false)
    const [type, setType] = useState("")
    const [typeTitle, setTypeTitle] = useState('All')
    let toShow = [];
    let perPage = 20;
    let end = page * perPage;
    let start = end - perPage;
    toShow = pokemons?.slice(start, end);

    // Trae todos los pokemons disponibles.
    const getPokemons = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279`)
            .then(res =>{
                setPokemons(res.data.results)
                setLastPage(Math.ceil(res.data.results?.length / perPage));
                setPage(1)
            })
            .catch(error => console.log(error))
    }

    // Obtengo el listado de pokemons por tipo
    const getPokemonsByType = async (type) =>{
        await axios.get(`https://pokeapi.co/api/v2/type/${type}/`)
            .then(res =>{
                setTypeTitle(type)
                setPokemons(res.data.pokemon)
                setChange(true)
                setPage(1)
            })
            .catch( error => console.log( error))
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
                const info = data?.pokemon
                return (<PokemonCard key={info?.name} pokemon={info} />)
            })
        }
    }



    useEffect( () =>{
        if(document.title !== 'Pokedex | Home'){
            document.title = 'Pokedex | Home'
        }
        // Verificar si se muestran todos los pokemons o solo se mostraran los filtrados por el tipo de pokemon.
        // if(type) {
        //     getPokemonsByType(type)
        // }
        // else {
            getPokemons()
        // }
    },[ type ])


    return (
        <div className='pokemons_container'>
            {/* <div className="header">
                <div className="subheader">
                    <div className="search_container">
                        <input
                            id='search'
                            type="search"
                            value={toSearch}
                            placeholder='Name or Id'
                            onChange={e => setToSearch(e.target.value.toLowerCase())}
                        />
                        <button onClick={() => navigate(`/pokemons/${toSearch}`)}>Search</button>
                    </div>
                    <div className="filter_bar">
                        <label htmlFor="types">Filter by Types: </label>
                        <select id="types" onChange={e => setType(e.target.value)}>
                            <option key='default_option' defaultChecked>Select</option>
                            {capTypeName()}
                        </select>
                    </div>
                </div>

                <div className="pagination_container">
                    <div className="navigation">
                        <button onClick={() => setPage(page - 1)} disabled={page === 1} >
                                Prev
                        </button>
                        <span>{ page }</span>
                        <button onClick={() => setPage(page + 1)} disabled={ page === lastPage } >
                            Next
                        </button>
                    </div>
                </div>
            </div> */}
            <h2>{typeTitle.toUpperCase()}</h2>
            <div className="cards_container">
                { loadPokemons() }
            </div>
        </div>
    );
};

export default Pokemons;
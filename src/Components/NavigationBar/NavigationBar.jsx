import logo from '../../assets/imgs/pokedex_logo.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navbar.css'
import axios from 'axios';


const NavigationBar = () => {
    const navigate = useNavigate();
    const userName = useSelector(state => state.userName);
    const [isDark, setIsDark] = useState(false);
    const [icon, setIcon] = useState('fa-moon');
    const [type, setType] = useState("");
    const [toSearch, setToSearch] = useState('')
    const [pokemonTypes, setPokemonTypes] = useState([])


    const changeMode = () =>{
        document.body.classList.toggle('Dark')
        setIsDark(!isDark)
        if(isDark){
            setIcon('fa-sun')
        }
        else{
            setIcon('fa-moon')
        }
    }

    // get list of pokemon types availables.
    const getPokemonTypes = async () =>{
        await axios.get(`https://pokeapi.co/api/v2/type/`)
            .then( res => setPokemonTypes(res.data.results))
            .catch( error => console.log(error))
    }

    const capTypeName = () => {
        return pokemonTypes?.map(type => {
            return (
                <option key={type.name} value={type.name}>
                    {type.name?.charAt(0)?.toUpperCase() + type.name?.slice(1)}
                </option>
            )
        })
    }

    useEffect( () => {
        getPokemonTypes()
    },[])

    return (
        <>
            <div className='nav_container'>
                {/* Navigation bar */}
                <nav className='navbar'>
                    <div className="nav_logo">
                        <img src={logo} alt="pokemon_logo" className='logo'/>
                    </div>
                    <ul className="menu">
                        <li className='menu_item'>
                            <NavLink to={'/pokemons'} className='menu_link'>
                                <span className='menu_select'>
                                    <i className="fa-solid fa-caret-right"></i>
                                </span>
                                <i className="fa-solid fa-house"></i> Home
                            </NavLink>
                        </li>
                        <li className='menu_item'>
                            <NavLink className='menu_link' onClick={() => changeMode()}>
                                <span className='menu_select'>
                                    <i className="fa-solid fa-caret-right"></i>
                                </span>
                                <i className={`fa-solid ${icon}`}></i> {isDark ? 'Dark' : 'Light'}
                            </NavLink>
                        </li>
                        <li className='menu_item'>
                            <NavLink className='menu_link' >
                                <span className='menu_select'>
                                    <i className="fa-solid fa-caret-right"></i>
                                </span>
                                <i className="fa-solid fa-gear"></i> Settings
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="nav_greetings">
                    <h2>Welcome! {userName} here you can find your favorite pokemon</h2>
                </div>
            </div>

            <div className="filters_container">
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
                            <option key='default_option' value=' ' defaultChecked>All</option>
                                {
                                    capTypeName()
                                }
                        </select>
                    </div>
                </div>

                {/* <div className="pagination_container">
                    <div className="navigation">
                        <button onClick={() => setPage(page - 1)} disabled={page === 1} >
                                Prev
                        </button>
                        <span>{ page }</span>
                        <button onClick={() => setPage(page + 1)} disabled={ page === lastPage } >
                            Next
                        </button>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default NavigationBar;
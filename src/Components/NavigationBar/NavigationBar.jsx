import logo from '../../assets/imgs/pokedex_logo.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './navbar.css'


const NavigationBar = () => {
    const userName = useSelector(state => state.userName);
    const [isDark, setIsDark] = useState(false);
    const [icon, setIcon] = useState('fa-moon');

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

    return (
        <>
            <div className='nav_container'>
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
        </>
    );
};

export default NavigationBar;
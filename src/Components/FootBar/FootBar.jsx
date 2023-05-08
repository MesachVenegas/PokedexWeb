import logo from '../../../src/assets/imgs/pokedex_logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './footbar.css';

const FootBar = () => {
    const navigate = useNavigate();


    const goUp = () => {
        if (window.scrollY > 0) {
            window.scrollTo({
                top: 170,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    return (
        <footer className='footer'>
            <div className="foot_header">
                <div className="logo_foot">
                    <div className="logo_container" onClick={() => navigate('/pokemons')}>
                        <img src={logo} alt="pokedex_logo" />
                    </div>
                    <p>Find your favorite pokemonster's</p>
                </div>
                {/* Nav menu */}
                <ul className="foot_menu">
                    <li className='foot_menu-item'>
                        <Link to={'/pokemons'} className='menu_link' onClick={ () => goUp()}>
                            <span className='menu_select'>
                                <i className="fa-solid fa-caret-right"></i>
                            </span>
                            <i className="fa-solid fa-house"></i> Home
                        </Link>
                    </li>
                    <li className='foot_menu-item'>
                        <Link className='menu_link' onClick={() => goUp()}>
                            <span className='menu_select'>
                                <i className="fa-solid fa-caret-right"></i>
                            </span>
                            <i className="fa-solid fa-arrow-up"></i> Go Up
                        </Link>
                    </li>
                </ul>
                {/*  Social links */}
                <ul className="social_menu">
                    <motion.li
                        className='social_item'
                        whileHover={{ scale: 1.1 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                        }}
                    >
                        <a className='social_link' href="https://github.com/MesachVenegas">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </motion.li>
                    <motion.li
                        className='social_item'
                        whileHover={{ scale: 1.1 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                        }}
                    >
                        <a className='social_link' href="https://www.linkedin.com/in/mesachvenegas/">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                    </motion.li>
                    <motion.li
                        className='social_item'
                        whileHover={{ scale: 1.1 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                        }}
                    >
                        <a className='social_link' href="#">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </motion.li>
                    <motion.li
                        className='social_item'
                        whileHover={{ scale: 1.1 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                        }}
                    >
                        <a className='social_link' href="mailto: mesach.venegas@hotmail.com">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                    </motion.li>
                </ul>

                <div className="site_info">
                    <p>Made with  <span className='info_heart'><i className="fa-solid fa-heart"></i></span> By <span className='info_author'>Mesach Venegas</span>  With data of <a href="https://pokeapi.co/?ref=public-apis">PokeAPI</a></p>
                </div>
            </div>
        </footer>
    );
};

export default FootBar;
import './loggin.css'
import avatar from '../../assets/imgs/oak.png'
import vector from '../../assets/imgs/pokeball.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserName } from '../../store/slices/user.slice';

const Loggin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("")

    const submit = e =>{
        e.preventDefault();
        dispatch(setUserName(inputValue))
        navigate("/pokemons")
    }

    useEffect( () => {
        const title = document.title;
        if(title !== 'Pokedex | Login'){
            document.title = 'Pokedex | Login'
        }
    },[])

    return (
        <div className='loggin_container'>
            <img src={ vector } alt="pokeball" className='background_pokeball'/>
            <div className="welcome">
                <h2>Hello Trainer!</h2>
                <figure className='ash_container'>
                    <img src={avatar} alt="ash" />
                </figure>
            </div>
            <form className="user_form" onSubmit={submit}>
                <label htmlFor="user">Give me your name to start</label>
                <div className="input_box">
                    <input
                        type="text"
                        id='user'
                        value={ inputValue }
                        onChange={ e => setInputValue(e.target.value) }
                        required
                    />
                    <button className='loggin_submit'>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Loggin;
import './loggin.css'
import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName } from '../../Store/slices/user.slice';
import avatar from '../../assets/imgs/oak.png'
import vector from '../../assets/imgs/pokeball.svg';

const Loggin = () => {
    const dispatch = useDispatch()
    const userName = useSelector( state => state.userName);
    const [inputValue, setInputValue] = useState("")

    const submit = e =>{
        e.preventDefault();
        dispatch( setUserName())
    }

    console.log (userName );
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
                        placeholder={ userName }
                        onChange={ e => setInputValue(e.target.value) }
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
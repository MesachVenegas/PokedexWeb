import './loggin.css'
import React from 'react';
import { useSelector } from 'react-redux';
import avatar from '../../assets/imgs/oak.png'

const Loggin = () => {
    const userName = useSelector( state => state.userName);


    return (
        <div className='loggin_container'>
            <div className="welcome">
                <h2>Hello Trainer!</h2>
                <figure className='ash_container'>
                    <img src={avatar} alt="ash" />
                </figure>
            </div>
            <form className="user_form">
                <label htmlFor="user">Give me your name to star</label>
                <div className="input_box">
                    <input type="text"  id='user' value={ userName }/>
                    <button className='loggin_submit'>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Loggin;
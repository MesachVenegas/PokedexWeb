import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import './pokemoncard.css'

const PokemonCard = ({ pokemon }) => {
    const [data, setData] = useState({});
    const [name, setName] =  useState('')
    const [types, setTypes] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('')
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('')

    useEffect( () =>{
        if(pokemon){
            axios.get(pokemon.url)
                .then( res =>{
                    setData(res.data)
                    capitalizeName(res.data.name)
                    loadTypes(res.data.types)
                    loadStats(res.data.stats)
                })
                .catch( res => console.log(res))

        }
    },[pokemon])

    const loadTypes = (typeList) =>{
        setTypes(typeList?.map(type => type.type.name).join(' - '))
    }

    const capitalizeName = (name) =>{
            setName(name?.charAt(0)?.toUpperCase() + name?.slice(1));
    }

    const loadStats = (stats) =>{
        stats.forEach(stat => {
            let statName =  stat.stat?.name;
            switch(statName){
                case 'hp':
                    setHp(stat.base_stat);
                case 'attack':
                    setAttack(stat.base_stat)
                case 'defense':
                    setDefense(stat.base_stat)
                case 'speed':
                    setSpeed(stat.base_stat)
                default:
                    return
            }
        });
    }

    return (
        <div className='pokemon_card'>
            <h3>{name}</h3>
            <div className="data_container">
                <ul className='pokemon_data'>
                    <li className='type'>Types: {types}</li>
                    <li className='bar_box'>
                        Hp:
                        <div className='bar_container'>
                            <span className='bar_fill' style={{minWidth: hp + 'px'}}></span>
                        </div>
                        {hp}
                    </li>
                    <li className='bar_box'>
                        Attack:
                        <div className='bar_container'>
                            <span className='bar_fill' style={{minWidth: attack + 'px'}}></span>
                        </div>
                        {attack}
                    </li>
                    <li className='bar_box'>
                        Defense:
                        <div className='bar_container'>
                            <span className='bar_fill' style={{minWidth: defense + 'px'}}></span>
                        </div>
                        {defense}
                    </li>
                    <li className='bar_box'>
                        Speed:
                        <div className='bar_container'>
                            <span className='bar_fill' style={{minWidth: speed + 'px'}}></span>
                        </div>
                        {speed}
                    </li>
                    {/* <li>Attack: {attack}</li>
                    <li>Defense: {defense}</li>
                    <li>Speed: {speed}</li> */}
                </ul>
                <figure className='pokemon_sprite'>
                    <img src={data.sprites?.front_default} alt="sprite-pokemon" />
                </figure>
            </div>
        </div>
    );
};

export default PokemonCard;
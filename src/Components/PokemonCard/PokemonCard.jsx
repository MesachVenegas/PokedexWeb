import { useEffect, useState } from 'react';
import axios from 'axios';
import altImg from  '../../assets/imgs/whoIs.png'
import './pokemoncard.css'

const PokemonCard = ({ pokemon, searchResult }) => {
    const [data, setData] = useState({});
    const [name, setName] =  useState('')
    const [types, setTypes] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('')
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('')

    const getData = async () => {
        axios.get(pokemon.url)
            .then(res => {
                setData(res.data)
                capitalizeName(res.data.name)
                loadTypes(res.data.types)
                loadStats(res.data.stats)
            })
            .catch(res => console.log(res))
    }

    useEffect( () => {
        if( searchResult) {
            console.log(searchResult);
        }else{
            getData()
        }
    },[pokemon, searchResult])

    const loadTypes = (typeList) => {
        setTypes(typeList?.map(type => type.type.name).join(' - '))
    }

    const capitalizeName = (name) => {
            setName(name?.charAt(0)?.toUpperCase() + name?.slice(1));
    }

    const loadStats = (stats) => {
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
            <figure className='pokemon_sprite'>
                <img
                    src={data.sprites?.front_default ? data.sprites?.front_default : altImg} alt="sprite-pokemon"
                />
            </figure>
            <div className="data_container">
                <ul className='pokemon_data'>
                    <li className='type'>Types: {types}</li>
                    <li className='bar_box'>
                        <label htmlFor="hp">Hp</label>
                        <progress id="hp" max="255" value={hp}>{hp}</progress>
                        <span>{hp}</span>
                    </li>
                    <li className='bar_box'>
                        <label htmlFor="attack">Attack</label>
                        <progress id="attack" max="255" value={attack}>{attack}</progress>
                        <span>{attack}</span>
                    </li>
                    <li className='bar_box'>
                        <label htmlFor="defense">Defense</label>
                        <progress id="defense" max="255" value={defense}>{defense}</progress>
                        <span>{defense}</span>
                    </li>
                    <li className='bar_box'>
                        <label htmlFor="speed">Speed</label>
                        <progress id="speed" max="255" value={speed}>{speed}</progress>
                        <span>{speed}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PokemonCard;
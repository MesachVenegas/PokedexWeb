import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import altImg from  '../../assets/imgs/whoIs.png';
import imagesTypes from '../data.json'
import axios from 'axios';
import './pokemoncard.css'

const PokemonCard = ({ pokemon }) => {
    const navigate = useNavigate();
    const [defaultImg, setDefaultImage] = useState(altImg)
    const [bg, setBg] = useState('')
    const [data, setData] = useState({});
    const [name, setName] =  useState('')
    const [types, setTypes] = useState('');
    const [firstType, setFirstType] = useState();
    const [secondType, setSecondType] = useState();
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('')
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('')

    const getData = async () => {
        if(pokemon?.url){
            axios.get(pokemon?.url)
                .then(res => {
                    setData(res?.data)
                    capitalizeName(res?.data.name)
                    loadTypes(res?.data.types)
                    loadStats(res?.data.stats)
                    setTypes(res?.data.types)
                    if (res.data?.sprites.other.dream_world.front_default) {
                        setDefaultImage(res.data?.sprites.other.dream_world.front_default);
                    } else if (res.data?.sprites.front_default) {
                        setDefaultImage(res.data?.sprites.front_default)
                    }
                })
                .catch(res => console.error(res))
        }
    }

    useEffect( () => {
        getData()
    },[pokemon, bg])

    const getBgByType = () => {
        let bg;
        const  type = data.types?.[0].type.name
        imagesTypes.backgrounds.forEach(typeJson => {
            if (typeJson.name == type) {
                bg = `url("${typeJson.url}")`;

            }
        })
        return bg;
    }

    const loadTypes = (typeList) => {
        setTypes(typeList?.map(type => type.type.name).join('  '))
    }

    const capitalizeName = (name) => {
            setName(name?.charAt(0)?.toUpperCase() + name?.slice(1));
    }

    const loadStats = (stats) => {
        stats.forEach(stat => {
            let statName =  stat.stat?.name;
            if(statName == 'hp') setHp(stat.base_stat);
            if(statName == 'attack') setAttack(stat.base_stat);
            if(statName == 'defense') setDefense(stat.base_stat);
            if(statName == 'speed') setSpeed(stat.base_stat);
        });
    }

    useEffect(() => {
        if (types) {
            imagesTypes.icons.forEach(icon => {
                if (types[0].type.name == icon.name) {
                    setFirstType(icon)
                }
                if (types[1]) {
                    if (types[1].type.name == icon.name) {
                        setSecondType(icon)
                    }
                }
                else {
                    setSecondType(undefined)
                }
            })
        }
    }, [types])

    return (
        <div
            className='pokemon_card'
            style={{ backgroundImage: getBgByType() }}
            onClick={() => navigate(`/pokemons/${data.name}`)}
        >
            <h3 className='poke_name'>{name}</h3>
            <figure className='pokemon_sprite'>
                <img
                    src={defaultImg}
                    alt={`${name}-sprite`}
                />
            </figure>
            <div className="data_container">
                <ul className='pokemon_data'>
                    <li className='type'>
                        {
                            firstType ? (
                                <figure className='icon_card-container'>
                                    <img src={firstType?.url} alt={firstType?.name} className='type_icon' />
                                </figure>
                            ) : ''
                        }
                        {
                            secondType ? (
                                <figure className='icon_card-container'>
                                    <img src={secondType?.url} alt={secondType?.name} className='type_icon' />
                                </figure>
                            ) : ''
                        }
                    </li>
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
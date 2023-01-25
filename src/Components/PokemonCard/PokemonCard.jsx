import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import altImg from  '../../assets/imgs/whoIs.png'
import axios from 'axios';
import source from '../data.json'
import './pokemoncard.css'

const PokemonCard = ({ pokemon }) => {
    const backgrounds = [
        {
            "name": "bug",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/0/05/Type_Background_Bug.png/revision/latest?cb=20171026003543"
        },
        {
            "name": "dark",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/f/f5/Type_Background_Dark.png/revision/latest?cb=20171026003554"
        },
        {
            "name": "dragon",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/2/28/Type_Background_Dragon.png/revision/latest?cb=20171026003601"
        },
        {
            "name": "electric",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/6/6c/Type_Background_Electric.png/revision/latest?cb=20171026003611"
        },
        {
            "name": "fairy",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/1/19/Type_Background_Fairy.png/revision/latest?cb=20171026003635"
        },
        {
            "name": "fighting",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/1/17/Type_Background_Fighting.png/revision/latest?cb=20171026003644"
        },
        {
            "name": "fire",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/6/64/Type_Background_Fire.png/revision/latest?cb=20171026003653"
        },
        {
            "name": "flying",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/6/65/Type_Background_Flying.png/revision/latest?cb=20171026004151"
        },
        {
            "name": "ghost",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/4/44/Type_Background_Ghost.png/revision/latest?cb=20171026003713"
        },
        {
            "name": "grass",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/9/92/Type_Background_Grass.png/revision/latest?cb=20171026003722"
        },
        {
            "name": "ground",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/a/a3/Type_Background_Ground.png/revision/latest?cb=20171026003731"
        },
        {
            "name": "ice",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/8/85/Type_Background_Ice.png/revision/latest?cb=20171026003739"
        },
        {
            "name": "normal",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/f/f6/Type_Background_Normal.png/revision/latest?cb=20171026003751"
        },
        {
            "name": "poison",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/d/db/Type_Background_Poison.png/revision/latest?cb=20171026003759"
        },
        {
            "name": "psychic",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/f/f8/Type_Background_Psychic.png/revision/latest?cb=20171026003814"
        },
        {
            "name": "rock",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/5/5d/Type_Background_Rock.png/revision/latest?cb=20171026003823"
        },
        {
            "name": "steel",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/3/30/Type_Background_Steel.png/revision/latest?cb=20171026003833"
        },
        {
            "name": "water",
            "url": "https://static.wikia.nocookie.net/pokemongo/images/d/d2/Type_Background_Water.png/revision/latest?cb=20171026003849"
        }
    ]
    const navigate = useNavigate();
    const [defaultImg, setDefaultImage] = useState(altImg)
    const [bg, setBg] = useState('')
    const [data, setData] = useState({});
    const [name, setName] =  useState('')
    const [types, setTypes] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('')
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('')

    const getData = async () => {
        axios.get(pokemon?.url)
            .then(res => {
                setData(res.data)
                capitalizeName(res.data.name)
                loadTypes(res.data.types)
                loadStats(res.data.stats)
                if (res.data?.sprites.other.dream_world.front_default) {
                    setDefaultImage(res.data?.sprites.other.dream_world.front_default);
                } else if (res.data?.sprites.front_default) {
                    setDefaultImage(res.data?.sprites.front_default)
                }
            })
            .catch(res => console.log(res))
        }

    useEffect( () => {
        getData()
        backgroundByType(data.types)
    },[pokemon, bg])

    const backgroundByType = (typeList) =>{
        let pokemonType = typeList?.[0]?.type.name;
        backgrounds.forEach(background =>{
            if(background.name == pokemonType){
                setBg(background.url);
            }else{
            }
        })
    }

    const loadTypes = (typeList) => {
        setTypes(typeList?.map(type => type.type.name).join(' - '))
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

    return (
        <div
            className='pokemon_card'
            style={{ backgroundImage: bg }}
            onClick={() => navigate(`/pokemons/${data.name}`)}
        >
            <h3>{name}</h3>
            <figure className='pokemon_sprite'>
                <img
                    src={defaultImg}
                    alt={`${name}-sprite`}
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
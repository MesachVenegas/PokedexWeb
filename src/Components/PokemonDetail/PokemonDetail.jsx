import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import altImg from '../../assets/imgs/whoIs.png'
import vector from '../../assets/imgs/pokeball.svg'
import axios from 'axios';
import bgTypes from '../data.json'
import './pokemondetail.css'

const PokemonDetail = () => {
    const { name } = useParams();
    const [defaultImg, setDefaultImage] = useState(altImg)
    const [consultStatus, setConsultStatus] = useState(0)
    const [data, setData] = useState({});
    const [pokeName, setPokeName] = useState('')
    const [types, setTypes] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('')
    const [specialAttack, setSpecialAttack] = useState('')
    const [specialDefense, setSpecialDefense] = useState('')
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('')
    let background = 'none';

    const getData = async () => {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => {
                setData(res.data)
                capitalizeName(res.data.name)
                loadStats(res.data.stats)
                loadTypes(res.data.types)
                if (res.data?.sprites.other.dream_world.front_default) {
                    setDefaultImage(res.data?.sprites.other.dream_world.front_default);
                } else if (res.data?.sprites.front_default) {
                    setDefaultImage(res.data?.sprites.front_default)
                }
                setConsultStatus(res.status)
            })
            .catch(res =>{
                setData(undefined)
                setConsultStatus(res.response)
            })
    }

    const getBgByType = () =>{
        const type = data.types?.[0].type;
        bgTypes.backgrounds.forEach( typeJson =>{
            if(typeJson.name == type?.name){
                background = `url("${typeJson.url}")`;
                console.log('entre');
                console.log(background);
                return background;
            }
        })
    }


    const capitalizeName = (name) => {
        setPokeName(name?.charAt(0)?.toUpperCase() + name?.slice(1));
    }

    const loadTypes = (typeList) => {
        setTypes(typeList?.map(type => type.type.name).join(' - '))
    }

    const loadStats = (stats) => {
        stats.forEach(stat => {
            let statName = stat.stat?.name;
            switch (statName) {
                case 'hp':
                    setHp(stat.base_stat);
                case 'attack':
                    setAttack(stat.base_stat)
                case 'special-attack':
                    setSpecialAttack(stat.base_stat)
                case 'defense':
                    setDefense(stat.base_stat)
                case 'special-defense':
                    setSpecialDefense(stat.base_stat)
                case 'speed':
                    setSpeed(stat.base_stat)
                default:
                    return
            }
        });
    }

    useEffect( () =>{
        getData()
    },[name])

    console.log(getBgByType());
    if(!data){
        return(
            <>
                <h1>No existe</h1>
            </>
        )
    }else{
        return (
            <>
                <div className='hero_pokemon' style={{backgroundImage: background } }>
                    <h1 className='title'>{pokeName}</h1>
                    <span className='number'>{`#${data.id}`}</span>
                    <figure className='sprite'>
                        <img src={ defaultImg} alt={`${pokeName}-sprite`} />
                    </figure>
                    <img src={vector} alt="vector_bg" className='vector_bg' />
                </div>
                <ul className='stats_container'>
                    <li className="stat_box types">
                        <h3>{types}</h3>
                    </li>
                    <li className="stat_box">
                        <label htmlFor="hp">Base Exp</label>
                        <progress id="hp" max="255" value={data.base_experience}></progress>
                        <span>{data.base_experience}</span>
                    </li>
                    <li className="stat_box">
                        <label htmlFor="hp">Hp</label>
                        <progress id="hp" max="255" value={hp}></progress>
                        <span>{hp}</span>
                    </li>
                    <li className="stat_box">
                        <label htmlFor="attack">Attack</label>
                        <progress id="attack" max="255" value={attack}></progress>
                        <span>{attack}</span>
                    </li>
                    <li className="stat_box">
                        <label htmlFor="special-attack">Special Attack</label>
                        <progress id="special-attack" max="255" value={specialAttack}></progress>
                        <span>{specialAttack}</span>
                    </li>
                    <li className="stat_box">
                        <label htmlFor="special-defense">Defense</label>
                        <progress id="special-defense" max="255" value={specialDefense}></progress>
                        <span>{specialDefense}</span>
                    </li>
                    <li className="stat_box">
                        <label htmlFor="defense">Special Defense</label>
                        <progress id="defense" max="255" value={defense}></progress>
                        <span>{defense}</span>
                    </li>
                    <li className="stat_box">
                        <label htmlFor="speed">Speed</label>
                        <progress id="speed" max="255" value={speed}></progress>
                        <span>{speed}</span>
                    </li>
                </ul>
            </>
        );
    }
};

export default PokemonDetail;
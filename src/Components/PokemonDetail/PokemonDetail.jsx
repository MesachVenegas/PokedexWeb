import EvolutionCard from '../Evolutions/EvolutionCard';
import NotFound from '../NotFound/NotFound';
import Description from '../Description/description';
import vector from '../../assets/imgs/pokeball.svg';
import altImg from '../../assets/imgs/whoIs.png';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import imagesTypes from '../data.json';
import Moves from '../moves/Moves';
import './pokemondetail.css';
import axios from 'axios';
import FootBar from '../FootBar/FootBar';

const PokemonDetail = () => {
    const { name } = useParams();
    const [defaultImg, setDefaultImage] = useState(altImg)
    const [consultStatus, setConsultStatus] = useState(0)
    const [data, setData] = useState({});
    const [pokeName, setPokeName] = useState('')
    const [types, setTypes] = useState();
    const [firstType, setFirstType] = useState();
    const [secondType, setSecondType] = useState();
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('')
    const [specialAttack, setSpecialAttack] = useState('')
    const [specialDefense, setSpecialDefense] = useState('')
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('')
    const positionY = window.scrollY;
    let background = 'none';

    const getData = async () => {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => {
                setData(res?.data)
                document.title = `Pokedex | ${res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1)}`
                capitalizeName(res.data?.name)
                loadStats(res.data?.stats)
                setTypes(res.data?.types)
                if (res.data?.sprites.other.dream_world.front_default) {
                    setDefaultImage(res.data?.sprites.other.dream_world.front_default);
                } else if (res.data?.sprites.front_default) {
                    setDefaultImage(res.data?.sprites.front_default)
                }
                setConsultStatus(res.status)
            })
            .catch(res =>{
                setData(false)
                setConsultStatus(res.response)
            })
    }


    const getBgByType = () =>{
        const type = data.types?.[0].type;
        imagesTypes.backgrounds.forEach( typeJson =>{
            if(typeJson.name == type?.name){
                background = `url("${typeJson.url}")`;
                return background;
            }
        })
    }


    const capitalizeName = (name) => {
        setPokeName(name?.charAt(0)?.toUpperCase() + name?.slice(1));
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


    useEffect(  () =>{
        getData()
        if(positionY > 0){
            window.scrollTo({
                top: 170,
                left: 0,
                behavior: 'smooth'
            })
        }
    },[name])

    useEffect( () =>{
        if(types){
            imagesTypes.icons.forEach(icon => {
                if (types[0].type.name == icon.name){
                    setFirstType(icon)
                }
                if(types[1]){
                    if (types[1].type.name == icon.name){
                        setSecondType(icon)
                    }
                }
                else{
                    setSecondType(undefined)
                }
            })
        }
    },[types])

    getBgByType()

    if(data){
        return (
            <main className='screen_sizer detail_layout'>
            {/* Representación del pokemon */}
                <div className='hero_pokemon' style={{backgroundImage: background } }>
                    <div className="head_hero">
                        <h1 className='title'>{pokeName.replace('-',' ')}</h1>
                        <span className='number'>{`#${data?.id}`}</span>
                    </div>
                    <figure className='sprite'>
                        <img src={ defaultImg} alt={`${pokeName}-sprite`} />
                    </figure>
                    <img src={vector} alt="vector_bg" className='vector_bg' />
                </div>

                {/* Description of abilities of pokemon */}
                <Description data={ data } />

                {/* estadísticas base del pokemon */}
                <ul className='stats_container'>
                    <li className="stat_box">
                        <div className="types">
                            {
                                firstType ? (
                                    <div className='type_item'>
                                        <figure className='icon_container'>
                                            <img src={firstType?.url} alt={firstType?.name} className='type_icon'/>
                                        </figure>
                                        <span>{firstType.name.charAt(0).toUpperCase() + firstType.name.slice(1)}</span>
                                    </div>
                                ) : ''
                            }
                            {
                                secondType ? (
                                    <div className='type_item'>
                                        <figure className='icon_container'>
                                            <img src={secondType?.url} alt={secondType?.name} className='type_icon' />
                                        </figure>
                                        <span>{secondType.name.charAt(0).toUpperCase() + secondType.name.slice(1)}</span>
                                    </div>
                                ) : ''
                            }
                        </div>
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

                {/* List of pokemon movements */}
                <Moves  data={ data }/>

                {/* Evolutions steps of pokemon */}
                <EvolutionCard id={ data?.id } />

                {/* foot bar */}
                <FootBar />
            </main>
        );
    }
    else{
        return (
            <NotFound />
        );
    }
};

export default PokemonDetail;
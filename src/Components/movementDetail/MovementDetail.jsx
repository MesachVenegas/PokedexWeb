import axios from 'axios';
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import './styles.css'

const MovementDetail = ({url}) => {
    const [type, setType] = useState(null);
    const [pp, setPP] = useState(null);
    const [description, setDescription] = useState(null);
    const [effect, setEffect] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [name, setName] = useState(null);
    const [power, setPower] = useState(null);
    const [damageType, setDamageType] = useState(null);
    const [concurseType, setConcurseType] = useState(null);
    const [category, setCategory] = useState(null);
    const [drain, setDrain] = useState(null);
    const [maxHits, setMaxHits] = useState(null);
    const [minHits, setMinHits] = useState(null);
    const [critRate , setCritRate] = useState(null);
    const [maxTurns, setMaxTurns] = useState(null);
    const [minTurns, setMinTurns] = useState(null);
    const [flinch, setFlinch] = useState(null);
    const [state, setState] = useState(null);

    const getData = async () =>{
        await axios.get(url)
            .then(res => {
                // console.log(res.data)
                setName(res.data.name)
                setPP(res.data.pp);
                setAccuracy(res.data.accuracy);
                setType(res.data.type.name);
                setPower(res.data.power);
                setDamageType(res.data.damage_class?.name)
                setConcurseType(res.data.contest_type?.name)
                setCategory(res.data.meta?.category?.name)
                setDrain(res.data.meta?.drain)
                setMaxHits(res.data.meta?.max_hits)
                setMinHits(res.data.meta?.min_hits)
                setCritRate(res.data.meta?.crit_rate)
                setMaxTurns(res.data.meta?.max_turns)
                setMinTurns(res.data.meta?.min_turns)
                setFlinch(res.data.meta?.flinch_chance)
                setState(res.data.meta?.stat_chance)
                // console.log(res.data.meta)
                // get effect description if language is english and not is null.
                if(res.data.effect_entries.length > 0){
                    res.data.effect_entries?.map(entry =>{
                        if(entry.language.name == 'en'){
                            setEffect(entry.effect)
                        }
                    })
                }else{
                    setEffect(null)
                }

                // get description text if language is english and not is null.
                if(res.data.flavor_text_entries.length > 0){
                    res.data.flavor_text_entries?.map(flavor => {
                        if(flavor.language.name == 'en'){
                            setDescription(flavor.flavor_text)
                        }
                    })
                }else{
                    setDescription(null)
                }
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getData()
    }, [url])

    return (
        <motion.div className='box_movement'>
            <motion.h2>{name?.charAt(0).toLocaleUpperCase() + name?.slice(1).replace('-', " ")}</motion.h2>
            <motion.div className='movement_data'>
                <motion.div className='move_stats'>
                    <motion.span className={type}>
                        Type: {type?.charAt(0).toLocaleUpperCase()+ type?.slice(1)}
                    </motion.span>
                    <motion.span className={concurseType}>
                        Contest Type: {concurseType?   concurseType?.charAt(0).toLocaleUpperCase() + concurseType?.slice(1) : "None" }
                    </motion.span>
                    <motion.span>
                        Damage Type: { damageType? damageType.charAt(0).toLocaleUpperCase() + damageType.slice(1) : "N/A" }
                    </motion.span>
                    <motion.span>
                        Category: {category? category : "N/A"}
                    </motion.span>
                    <motion.span>
                        Accuracy: {accuracy ?`${accuracy}%` : "N/A"}
                    </motion.span>
                    <motion.span>
                        Power: {power ? power : "N/A"}
                    </motion.span>
                    <motion.span>
                        PP: {pp}
                    </motion.span>
                    <motion.span>
                        Health Drain: {drain ? drain : "N/A"}
                    </motion.span>
                    <motion.span>
                        Crit Rate: {critRate ? critRate : "N/A"}
                    </motion.span>
                    <motion.span>
                        Max Hits: {maxHits? maxHits : "N/A"}
                    </motion.span>
                    <motion.span>
                        Min Hits: {minHits? minHits : "N/A"}
                    </motion.span>
                    <motion.span>
                        Max Turns: {maxTurns? maxTurns : "N/A"}
                    </motion.span>
                    <motion.span>
                        Min Turns: {minTurns? minTurns : "N/A"}
                    </motion.span>
                    <motion.span>
                        Flinch Chance: {flinch? `${flinch}%` : "N/A"}
                    </motion.span>
                    <motion.span>
                        Stat Chance: {state? `${state}%` : "N/A"}
                    </motion.span>
                </motion.div>
                <motion.h4>Description:</motion.h4>
                <motion.p className='description_info'>{description ? description : "N/A"}</motion.p>
                <motion.h4>Effect: </motion.h4>
                <motion.p className='effect_info'>{effect ? effect : "N/A"}</motion.p>
            </motion.div>
        </motion.div>
    );
};

export default MovementDetail;
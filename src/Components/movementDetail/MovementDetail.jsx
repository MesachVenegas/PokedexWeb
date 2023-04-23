import axios from 'axios';
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import './styles.css'

const MovementDetail = ({url}) => {
    const [type, setType] = useState(null);
    const [pp, setPP] = useState(null);
    const [description, setDescription] = useState(null);
    const [effect, setEffect] = useState(null);
    const [accuracy, setAccuracy] = useState(null)
    const [name, setName] = useState(null)
    const [power, setPower] = useState(null)
    const [damageType, setDamageType] = useState(null)

    const getData = async () =>{
        await axios.get(url)
            .then(res => {
                console.log(res.data)
                setName(res.data.name)
                setPP(res.data.pp);
                setAccuracy(res.data.accuracy);
                setType(res.data.type.name);
                setPower(res.data.power);
                setDamageType(res.data.damage_class.name)

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
        <>
            <motion.div className='box_movement'>
                <h2>{name?.charAt(0).toLocaleUpperCase() + name?.slice(1).replace('-', " ")}</h2>
                <motion.div className='movement_data'>
                    <div className='move_stats'>
                        <span className={type}>
                            Type: {type?.charAt(0).toLocaleUpperCase()+ type?.slice(1)}
                        </span>
                        <span>
                            Accuracy: {accuracy ? accuracy : "N/A"}
                        </span>
                        <span>
                            Power: {power ? power : "N/A"}
                        </span>
                        <span>
                            Damage Type: {damageType? damageType : "N/A"}
                        </span>
                        <span>
                            PP: {pp}
                        </span>
                    </div>
                    <h4>Description:</h4>
                    <p>{ description  ? description : "N/A"}</p>
                    <h4>Effect: </h4>
                    <p>{effect ? effect : "N/A"}</p>
                </motion.div>
            </motion.div>
        </>
    );
};

export default MovementDetail;
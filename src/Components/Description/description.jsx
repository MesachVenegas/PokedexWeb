import axios from "axios";
import { useEffect, useState } from "react";
import './style.css'

const description = ({ data }) => {
    const [abilityName, setAbilityName] = useState("")
    const [effect, setEffect] = useState();

    // get url of ability data to request.
    const getUrl =  () => {
        data.abilities?.map((abilities)=>{
            if(!abilities?.is_hidden){
                setAbilityName(abilities?.ability?.name)
                getEffect(abilities?.ability?.url)
            }

        })

    }

    // Get description from special ability in ability.effects_entries property
    const getEffect = async (url) => {
        await axios.get(url)
            .then( res => {
                res.data.effect_entries?.map(entry => {
                    if (entry.language.name === "en"){
                        setEffect(entry?.effect)
                    }
                })
            })
    }


    useEffect( () => {
        getUrl()
    },[data])

    return (
        //  List of effect entries abilities.
        <div className = "abilities" >
            <h2>Special Ability</h2>
            <h3 className="ability_title">
                {
                    abilityName.charAt(0).toLocaleUpperCase() + abilityName.slice(1)
                }
            </h3>
            <p className="ability_description">
                { effect }
            </p>
        </div >
    );
};

export default description;
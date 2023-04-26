import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './moves.css'
import MovementDetail from '../movementDetail/MovementDetail';

const Moves = ({ data }) => {
    const [selectedId , setSelectedId] = useState(null)
    const [selectedUrl, setSelectedUrl] = useState(null)


    const loadMoves = () => {
        return data.moves?.map(movement => {
            return(
                <motion.div key={movement.move.name} layoutId={movement.move.name} className='move_container' onClick={ () => { 
                    setSelectedId(movement.move.name)
                    setSelectedUrl(movement.move.url)
                }}>
                    <motion.span className="movement">
                        { movement.move.name.replace("-"," ") }
                    </motion.span>
                </motion.div>
            )
        })
    }

    return (
        <div className="movements">
            <h2>Moves</h2>
            <div className="moves">
                {
                    loadMoves()
                }
            </div>
            <AnimatePresence>
                { selectedId && (
                    <motion.div className='move_detail' layoutId={selectedId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }}>
                        <motion.button className='close_btn' onClick={ () => setSelectedId(null) }>
                            <motion.i className="fa-solid fa-xmark"></motion.i>
                        </motion.button>
                        <MovementDetail  url={selectedUrl}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Moves;
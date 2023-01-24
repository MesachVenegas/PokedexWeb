import loadImg from '../../assets/imgs/pokeball_loading.png';
import './loading.css';

const Loading = () => {
    return (
        <div className='loader_overlay'>
            <figure className='loader_container'>
                <span className='pulse_pokeball'></span>
                <img
                    src={loadImg}
                    alt="Pokeball_loading"
                    className='loader'
                />
            </figure>
        </div>
    );
};

export default Loading;
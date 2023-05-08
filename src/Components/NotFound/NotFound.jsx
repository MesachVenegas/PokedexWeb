import { Link } from 'react-router-dom';
import errorImage from '../../assets/imgs/error.png';

const NotFound = () => {
    return (
        <main className='not_found-view'>
            <h2 className='sorry_msg'>SORRY</h2>
            <div className="error_img">
                <span className='error_num'>4</span>
                <figure className='error_image_container'>
                    <img src={errorImage} alt='not_found'></img>
                </figure>
                <span className='error_num'>4</span>
            </div>
            <h2 className='not_found'>Pokemon not found</h2>
            <span className='back_btn'>
                <Link className='btn_link' to={'/pokemons'}>BACK HOME</Link>
            </span>
        </main>
    );
};

export default NotFound;
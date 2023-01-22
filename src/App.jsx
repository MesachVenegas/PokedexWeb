import { HashRouter, Routes, Route } from 'react-router-dom'
import PokemonDetail from './Components/PokemonDetail/PokemonDetail'
import Pokemons from './Components/Pokemons/Pokemons'
import Loggin from './Components/Loggin/Loggin'
import './App.css'

function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={ <Loggin /> }/>
                <Route path='/pokedex' element={ <Pokemons />} />
                <Route path='/detail' element={ <PokemonDetail/> } />
            </Routes>
        </HashRouter>
    )
}

export default App

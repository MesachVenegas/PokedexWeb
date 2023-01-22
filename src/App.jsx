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
                <Route path='/pokemons' element={ <Pokemons />} />
                <Route path='/detail:name' element={ <PokemonDetail/> } />
            </Routes>
        </HashRouter>
    )
}

export default App
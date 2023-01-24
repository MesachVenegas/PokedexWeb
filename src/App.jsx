import { HashRouter, Routes, Route } from 'react-router-dom'
import PokemonDetail from './Components/PokemonDetail/PokemonDetail'
import Pokemons from './Components/Pokemons/Pokemons'
import Loggin from './Components/Loggin/Loggin'
import './App.css'
import ProtectedRoutes from './Components/ProtectedRoutes'

function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={ <Loggin /> }/>
                <Route element={ <ProtectedRoutes />}>
                    <Route path='/pokemons' element={ <Pokemons />} />
                    <Route path='/pokemons/:name' element={ <PokemonDetail/> } />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App
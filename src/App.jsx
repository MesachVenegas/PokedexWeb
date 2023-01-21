import { HashRouter, Routes, Route } from 'react-router-dom'
import Loggin from './Components/Loggin/Loggin'
import './App.css'

function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={ <Loggin /> }/>
            </Routes>
        </HashRouter>
    )
}

export default App

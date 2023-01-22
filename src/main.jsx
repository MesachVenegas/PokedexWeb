import App from './App'
import React from 'react'
import Store from './store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={Store}>
            <App />
        </Provider>
    </React.StrictMode>
);
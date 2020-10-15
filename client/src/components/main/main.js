import React from 'react'
import './main.css'
import Playerscores from './playerscores/playerscores'
import { Route } from 'react-router-dom'

const Main = () => {
    return (
        <div className="main">  
            <Route path="/scores">
                <Playerscores />
            </Route>
        </div>
    )
}

export default Main
import React from 'react'
import './main.css'
import Playerscores from './playerscores/playerscores'
import Games from './games/games'
import { Route } from 'react-router-dom'

const Main = () => {
    return (
        <div className="main">  
            <Route path="/scores">
                <Playerscores />
            </Route>
            <Route path="/games">
                <Games />
            </Route>
        </div>
    )
}

export default Main
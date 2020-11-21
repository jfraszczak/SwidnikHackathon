import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import HomePage from "./components/HomePage/HomePage"
import BicyclesPage from "./components/BicyclesPage/BicyclesPage"
import StreetsPage from "./components/StreetsPage/StreetsPage"

class App extends Component {

    render(){
        return(
            <Switch>
                <Route path="/home" component={HomePage} exact />
                <Route path="/bicycles" component={BicyclesPage} exact />
                <Route path="/streets" component={StreetsPage} exact />
            </Switch>
        )
    }
}

export default App
import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import HomePage from "./components/HomePage/HomePage"
import BicyclesPage from "./components/BicyclesPage/BicyclesPage"
import StreetsPage from "./components/StreetsPage/StreetsPage"
import StreetAnalysis from './components/StreetsPage/StreetAnalysis'
import CongestedStreetsList from './components/StreetsPage/CongestedStreetsList'
import PedestriansPage from './components/PedestriansPage/PedestriansPage'

class App extends Component {

    render(){
        return(
            <Switch>
                <Route path="/home" component={HomePage} exact />
                <Route path="/bicycles" component={BicyclesPage} exact />
                <Route path="/streets" component={StreetsPage} exact />
                <Route path="/street/:id" component={StreetAnalysis} exact />
                <Route path="/congested_streets" component={CongestedStreetsList} exact />
                <Route path="/pedestrians" component={PedestriansPage} exact />
            </Switch>
        )
    }
}

export default App
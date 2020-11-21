import React, { Component } from 'react'
import NavBar from "../NavBar"
import PedestriansMap from './PedestrainsMap'

class PedestriansPage extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){

        return(
            <div>
                <NavBar />
                <PedestriansMap />
            </div>
        )
    }
}
export default PedestriansPage
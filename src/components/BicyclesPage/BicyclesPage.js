import React, { Component } from 'react'
import NavBar from "../NavBar"
import BicyclesGraphs from './BicyclesGraphs'

class BicyclesPage extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){

        return(
            <div>
                <NavBar />
               <BicyclesGraphs />
            </div>
        )
    }
}
export default BicyclesPage
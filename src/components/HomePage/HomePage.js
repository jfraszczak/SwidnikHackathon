import React, { Component } from 'react'
import NavBar from "../NavBar"
import MapComponent from './MapComponent'

class HomePage extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){

        return(
            <div>
                <NavBar />
                <MapComponent />
            </div>
        )
    }
}
export default HomePage
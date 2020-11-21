import React, { Component } from 'react'
import './Streets.css'
import NavBar from "../NavBar"
import StreetsList from './StreetsList'

class StreetsPage extends Component{
    constructor(){
        super()
        this.state = {}
    }
    
    render(){

        return(
            <div>
                <NavBar role={this.state.role}/>
                <StreetsList />
            </div>
        )
      }

}

export default StreetsPage
import React, { Component } from 'react'
import './Streets.css'

class StreetsList extends Component{
    constructor(){
        super()
        this.state = {
            streets: []
        }

        this.fetchData = this.fetchData.bind(this)
        this.fetchData()
    }

    fetchData(){
    
        fetch('https://swidnikhackatonapi.azurewebsites.net/streets')
        .then(response => response.json())
        .then(data => {
            this.setState({
                streets: data
            })
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div id="user-container">
                        <div  id="form-wrapper" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <h1>Analiza ulic</h1>
                            <a href='/congested_streets'><button className="btn btn-outline-danger">Zobacz najbardziej newralgiczne ulice</button></a>
                        </div>
                        <div id="list-wrapper">
                            {
                                this.state.streets.map(function(street, index){
                                    return(
                                        <div classname="flex-wrapper">
                                            <div className="user-wrapper">
                                                <div className="user-data">
                                                    <h5>{street.streetName.split(',')[0]}</h5>
                                                    <span>{street.streetName.split(',')[1]}</span>
                                                </div>
                                                <div className="manage-button">
                                                    <a href={'/street/' + street.id}><button className="btn btn-outline-info">Zobacz szczegóły</button></a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default StreetsList
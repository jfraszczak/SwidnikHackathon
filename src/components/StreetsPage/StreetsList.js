import React, { Component } from 'react'
import './Streets.css'

class StreetsList extends Component{
    constructor(){
        super()
        this.state = {
            streets: [{street_name: 'Akacjowa', housing_estate: 'Osiedle Brzeziny II'}, 
            {street_name: 'Aleja Armii Krajowej', housing_estate: 'Osiedle Wschód'},
            {street_name: 'Test test', housing_estate: 'Osiedle Wschód'}
        ]
        }
    }

    render(){
    return(
        <div>
            <div className="container">
                <div id="user-container">
                    <div  id="form-wrapper">
                        <h1>Analiza ulic</h1>
                    </div>
                    <div id="list-wrapper">
                        {
                            this.state.streets.map(function(street, index){
                                return(
                                    <div classname="flex-wrapper">
                                        <div className="user-wrapper">
                                            <div className="user-data">
                                                <h5>{street.street_name}</h5>
                                                <span>{street.housing_estate}</span>
                                            </div>
                                            <div className="manage-button">
                                                <button className="btn btn-outline-info">Zobacz szczegóły</button>
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
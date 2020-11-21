import React, { Component } from 'react'
import './Streets.css'
import NavBar from "../NavBar"

class CongestedStreetsList extends Component{
    constructor(){
        super()
        this.state = {
            data: [],
            filtered_data: []
        }

        this.fetchData = this.fetchData.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.fetchData()
    }

    fetchData(){
    
        fetch('https://swidnikhackatonapi.azurewebsites.net/measurements/GroupedByDate?sort=SpeedRatio')
        .then(response => response.json())
        .then(data => {
            this.setState({
                data: data
            })
        })
    }

    onSearch(){
        var date = document.getElementById('calendar').value
        console.log(date)
        var day = parseInt(date.substring(8, 10))
        var month = parseInt(date.substring(5, 7))
        var year = parseInt(date.substring(0, 4))
        console.log('A', day, month, year)

        var filtered = []
        this.state.data.forEach(element=>{
            date = element.key.date
            var day1 = parseInt(date.substring(8, 10))
            var month1 = parseInt(date.substring(5, 7))
            var year1 = parseInt(date.substring(0, 4))
            console.log('B', day1, month1, year1)

            if(year==year1 && month == month1 && day == day1){

                fetch('https://swidnikhackatonapi.azurewebsites.net/streets/' + element.key.streetID)
                .then(response => response.json())
                .then(data => {
                    var streetName = data.streetName.split(',')[0]
                    element.key.streetName = streetName
                    filtered.push(element)
                    console.log(streetName)
                    console.log(element)

                    this.setState({
                        filtered_data: filtered
                    })
                })

            }
        })

    }

    render(){
        return(
            <div>
                <NavBar />

                <div className="container">
                    <div id="user-container">
                        <div  id="form-wrapper" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <h1>Najbardziej newralgiczne ulice</h1>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <input type="date" id='calendar' min="2020-11-20"></input>
                                <button type="button" class="btn btn-info" style={{marginTop: '3%'}} onClick={this.onSearch}>Szukaj</button>
                            </div>
                        </div>
                            <div id="list-wrapper">
                            {
                                this.state.filtered_data.map(function(street, index){
                                    if(index < 10){
                                        return(
                                            <div classname="flex-wrapper">
                                                <div className="user-wrapper">
                                                    <div className="user-data">
                                                        <h5>{street.key.streetName}</h5>
                                                    </div>
                                                    <div className="manage-button">
                                                        <a href={'/street/' + street.key.streetID}><button className="btn btn-outline-info">Zobacz szczegóły</button></a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CongestedStreetsList
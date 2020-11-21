import React, { Component } from 'react'
import NavBar from "../NavBar"
import CanvasJSReact from '../../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StreetAnalysis extends Component{

    constructor() {
        super()
        this.state = {
            current_data: [],
            street_data: [],
            weekDayAverageData: [],
            week_day: 0,
            dataPoints: [],
            day_by_day_data: []
        }

        this.changeWeekDay = this.changeWeekDay.bind(this)
        this.calculateMovingAverage = this.calculateMovingAverage.bind(this)

    }

    changeWeekDay(){
        var new_week_day = document.getElementById('select_week_day').value
        this.setState({
            week_day: new_week_day
        })

        console.log(new_week_day)

        var dataPoints = []
        this.state.weekDayAverageData.forEach(element => {
            if(element.key.dayOfWeek == new_week_day){
                dataPoints.push({'x': element.key.hour, 'y': 1 - element.averageCurrentSpeed / this.state.current_data.freeFlowSpeed})
            }
        });

        this.setState({
            dataPoints: dataPoints
        })
    }

    componentWillMount(){

        fetch('https://swidnikhackatonapi.azurewebsites.net/measurements')
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                if(element.streetID == this.props.match.params.id){
                    this.setState({
                        current_data: element
                    })
                }
            });
        })

        fetch('https://swidnikhackatonapi.azurewebsites.net/streets/' + this.props.match.params.id)
        .then(response => response.json())
        .then(data => {
            data.streetName = data.streetName.split(',')[0]
            this.setState({
                street_data: data
            })
        })

        fetch('https://swidnikhackatonapi.azurewebsites.net/measurements/GroupedByDay/' + this.props.match.params.id)
        .then(response => response.json())
        .then(data => {
            this.setState({
                weekDayAverageData: data
            })

            var dataPoints = []
            data.forEach(element => {
                if(element.key.dayOfWeek == this.state.week_day){
                    dataPoints.push({'x': element.key.hour, 'y': 1 - element.averageCurrentSpeed / this.state.current_data.freeFlowSpeed})
                }
            });

            this.setState({
                dataPoints: dataPoints
            })
        })

        
        fetch('https://swidnikhackatonapi.azurewebsites.net/measurements/GroupedByDate/' + this.props.match.params.id)
        .then(response => response.json())
        .then(data => {
            
            var new_data = []
            data.forEach(element => {
                new_data.push({'x': element.key.date, 'y': 1 - element.averageCurrentSpeed / element.averageFreeFlowSpeed})
            });

            this.setState({
                day_by_day_data: new_data
            })
        })
    }

    calculateMovingAverage(data){
        var new_data = []
        for(var i = 0; i < data.length; i++){
            var avg = 0;
            if(i < 6){
                for(var j = 0; j <= i; j++){
                    avg += data[j].y
                }
                avg = avg / (i + 1)
            }
            else{
                for(var j = i - 6; j <= i; j++){
                    avg += data[j].y
                }
                avg = avg / 7
            }
            new_data.push({x: data[i].x, y: avg})
        }

        console.log(new_data)
        return new_data
    }


    render(){

		const options1 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Wykres średniego natężenia ruchu"
			},
			axisY: {
                title: "Natężenie",
                maximum: 1,
                minimum: -0.05,
                interval: 0.1
			},
			axisX: {
				title: "Godzina",
			},
			data: [{
				type: "line",
				dataPoints: this.state.dataPoints
			}]
        }

        var dataPoints = []
        this.state.day_by_day_data.forEach(element =>{
            var day = parseInt(element.x.substring(8, 10))
            var month = parseInt(element.x.substring(5, 7))
            var year = parseInt(element.x.substring(0, 4))
            console.log(day, month, year)
            dataPoints.push({x: new Date(year, month - 1, day), y: element.y})
        })

        console.log(dataPoints)
        
        
        const options2 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Średnia ruchoma natężenia ruchu"
			},
			axisY: {
                title: "Natężenie",
                maximum: 1,
                minimum: -0.05,
                interval: 0.1
			},
			axisX: {
                title: "Dzień",
                valueFormatString: "DD MMM",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
			},
			data: [{
				type: "line",
                xValueFormatString: "DD MMM, YYYY",
				dataPoints: this.calculateMovingAverage(dataPoints)
            }  
        ]
        }
    
		
		return (
		<div>
            <NavBar />
            <div className='container' style={{marginTop: '2%'}}>
                <h1>{this.state.street_data.streetName}</h1>
                <hr></hr>
                <div style={{marginTop: '3%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <div>
                        <h6><b>Obecny czas podróży: </b><span className="badge badge-info" style={{width: '60px', fontSize: '1.1em'}}>{this.state.current_data.currentTravelTime}</span></h6>
                        <h6><b>Czas podróży bez natężenia ruchu: </b><span className="badge badge-secondary" style={{width: '60px', fontSize: '1.1em'}}>{this.state.current_data.freeFlowTravelTime}</span></h6>
                    </div>
                    <div>
                        <h6><b>Obecna prędkość: </b><span className="badge badge-info" style={{width: '60px', fontSize: '1.1em'}}>{this.state.current_data.currentSpeed}</span></h6>
                        <h6><b>Prędkość bez natężenia ruchu: </b><span className="badge badge-secondary" style={{width: '60px', fontSize: '1.1em'}}>{this.state.current_data.freeFlowSpeed}</span></h6>
                    </div>
                </div>
                <br></br>
                <div style={{marginTop: '3%'}}>
			        <CanvasJSChart options = {options1}/>
                </div>
                
                <form style={{width: '40%', margin: 'auto'}}>
                    <div className="form-group">
                        <label for="select_week_day">Dzień tygodnia</label>
                        <select class="form-control" id="select_week_day" onChange={this.changeWeekDay}>
                        <option value={1}>Poniedziałek</option>
                        <option value={2}>Wtorek</option>
                        <option value={3}>Środa</option>
                        <option value={4}>Czwartek</option>
                        <option value={5}>Piątek</option>
                        <option value={6}>Sobota</option>
                        <option value={0}>Niedziela</option>
                        </select>
                    </div>
                </form>

                <div style={{marginTop: '5%'}}>
			        <CanvasJSChart options = {options2}/>
                </div>
                
            </div>
		</div>
		);
    }
}

export default StreetAnalysis
import React, { Component } from 'react'
import CanvasJSReact from '../../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BicycleGraph extends Component{

    constructor() {
        super()
        this.state = {

        }

    }

    render(){
        const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", //"light1", "dark1", "dark2"
			title:{
				text: this.props.title
			},
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: this.props.dataPoints
			}]
        }

        return (
            <div style={{marginTop: '3%'}}>
                <CanvasJSChart options = {options}/>
            </div>
        )
    }
}

export default BicycleGraph
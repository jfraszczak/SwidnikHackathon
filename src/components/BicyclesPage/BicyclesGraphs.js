import React, { Component } from 'react'
import BicycleGraph from './BicycleGraph'

class BicyclesGraphs extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

	render() {
		const dataPoints1 = [
            { x: 3, y: 29 },
            { x: 4, y: 219 },
            { x: 5, y: 278 },
            { x: 6, y: 362 },
            { x: 7, y: 315 },
            { x: 8, y: 393 },
            { x: 9, y: 249 },
            { x: 10, y: 215},
            { x: 11, y: 78 }
        ]

        const dataPoints2 = [
            { x: 3, y: 199 },
            { x: 4, y: 629 },
            { x: 5, y: 742 },
            { x: 6, y: 991 },
            { x: 7, y: 757 },
            { x: 8, y: 769 },
            { x: 9, y: 546 },
            { x: 10, y: 464},
            { x: 11, y: 229 }
        ]

        const dataPoints3 = [
            { x: 3, y: 26 },
            { x: 4, y: 134 },
            { x: 5, y: 119 },
            { x: 6, y: 264 },
            { x: 7, y: 223 },
            { x: 8, y: 261 },
            { x: 9, y: 173 },
            { x: 10, y: 140},
            { x: 11, y: 49 }
        ]
        

		
		return (
            <div className='container' style={{marginTop: '3%', width: '60%'}}>
                <BicycleGraph dataPoints={dataPoints1} title="ul. Racławicka / ul. Wyszyńskiego"/>
                <BicycleGraph dataPoints={dataPoints2} title="ul. Niepodległości"/>
                <BicycleGraph dataPoints={dataPoints3} title="Centrum Kultury"/>
            </div>
		);
	}
}
export default BicyclesGraphs
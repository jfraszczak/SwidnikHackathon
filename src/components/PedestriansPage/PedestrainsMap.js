import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline} from 'react-leaflet';


class PedestriansMap extends Component{
    constructor(){
        super()
        this.state = {
            data: [],
            positions: []
        }
        this.onClick = this.onClick.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.fetchData()
    }

    fetchData(){
    
        fetch('https://swidnikhackatonapi.azurewebsites.net/PedestriansTraffic/GetProcessedData')
        .then(response => response.json())
        .then(data => {
            this.setState({
                data: data
            })
            var positions = []
            for(var i = 0; i < data.length; i++){
                var single_positions = []
                data[i].data.forEach(element=>{
                    single_positions.push([element.latitude, element.longitude])
                })
                positions.push(single_positions)
            }

            this.setState({
                positions: positions
            })

        })
    }

    onClick(){
        console.log('ELO')
    }

    render() {

        console.log(this.state.positions)

        const lines = this.state.positions.map(function(p){
            return <Polyline positions={p} color={'red'} weight={1} />
        })

        return(
            <MapContainer
            onClick={()=>{console.log('SIWMA')}}
                center={[51.2134, 22.69621]}
                //center={[51.2134, 22.6794]}
                zoom={15}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
            >
                <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />

                {/* <Circle 
                  center={[51.21898, 22.69621]}
                  fillColor="blue" 
                  radius={100}
                  eventHandlers={{click: this.onClick}}/>  */}

                {lines}
    
   
            </MapContainer>
        )
    }
}
export default PedestriansMap


import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline} from 'react-leaflet';
import "./app.css";


class MapComponent extends Component{
    constructor(){
        super()
        this.state = {}
        this.onClick = this.onClick.bind(this)
    }

    onClick(){
        console.log('ELO')
    }

    render() {
        return(
            <MapContainer
            onClick={()=>{console.log('SIWMA')}}
                center={[51.21898, 22.69621]}
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

                <Circle 
                  center={[51.21898, 22.69621]}
                  fillColor="blue" 
                  radius={100}
                  eventHandlers={{click: this.onClick}}/> 

                <Polyline positions={[[51.21386570241472, 22.711367898462925], [51.21454872564601, 22.71217328958403]]} color={'red'} weight={8} eventHandlers={{click: this.onClick}}/>
    
   
            </MapContainer>
        )
    }
}
export default MapComponent


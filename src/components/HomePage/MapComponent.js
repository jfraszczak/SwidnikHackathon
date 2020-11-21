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
                center={[51.2134, 22.69621]}
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

            </MapContainer>
        )
    }
}
export default MapComponent


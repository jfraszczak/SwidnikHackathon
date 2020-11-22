import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline} from 'react-leaflet';


class PedestriansMap extends Component{
    constructor(){
        super()
        this.state = {
            data: [],
            positions: [],
            centroids: []
        }
        this.onClick = this.onClick.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.calculateDistance = this.calculateDistance.bind(this)
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

            console.log(positions)

            var flatten_positions = []
            for(var i = 0; i < positions.length; i++){
                for(var j = 0; j < positions[i].length; j++){
                    flatten_positions.push(positions[i][j])
                }
            }

            console.log(flatten_positions)

            var centroids = []
            var already_included = []

            for(var i = 0; i < flatten_positions.length; i++){
                var num = 0;
                var tmp = []
                for(var j = 0; j < flatten_positions.length; j++){
                    var d = this.calculateDistance(flatten_positions[i][0], flatten_positions[j][0], flatten_positions[i][1], flatten_positions[j][1])
                    if(d < 100 && !already_included.includes(j)){
                        num += 1
                        tmp.push(j)
                    }
                }
                if(num > 0){
                    centroids.push([flatten_positions[i], num])
                    for(var k = 0; k < tmp.length; k++){
                        already_included.push(tmp[k])
                    }

                }
            }

            console.log('CENTROIDS', centroids)

            this.setState({
                centroids: centroids
            })

        })
    }

    calculateDistance(lat1, lat2, lon1, lon2){
        const R = 6371e3;
        const phi1 = lat1 * Math.PI/180; // φ, λ in radians
        const phi2 = lat2 * Math.PI/180;
        const delta_phi = (lat2-lat1) * Math.PI/180;
        const delta_lambda = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(delta_phi/2) * Math.sin(delta_phi/2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres

        return d
    }

    onClick(){
        console.log('ELO')
    }

    render() {

        console.log(this.state.positions)

        const lines = this.state.positions.map(function(p){
            return <Polyline positions={p} color={'red'} weight={1} />
        })

        const circles = this.state.centroids.map(function(p){
            var color = 'blue'
            var radius = 50
            if(p[1] > 10){
                color = 'red'
            }
            return <Circle 
                center={p[0]}
                fillColor={color}
                radius={radius}> 
                    <Popup>
                        Liczba wizyt: <br /> <b>{p[1]}</b>
                    </Popup>
                </Circle>
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
                {circles}
    
   
            </MapContainer>
        )
    }
}
export default PedestriansMap


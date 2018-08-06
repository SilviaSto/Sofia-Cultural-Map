import React, {Component} from 'react';


class Map extends Component{
    render(){

        return(
            <section id="map-container">
                <div id="map" ref='map'style={{height:'100%'}} aria-label="Landmark location" role="application"></div>
            </section>
        )
    }
}

export default Map;
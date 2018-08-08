import React, { Component } from 'react';
import landmarks from './data/landmarks';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import escapeRegExp from 'escape-string-regexp';


//https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/

function loadJS(src){ 
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
  //console.log(`REf:${ref}`, ref)
  //onsole.log(`Script:${script}`, script)
}



class App extends Component {


 state = {
    query:'',
    landmarks:landmarks,
    markers:[],
    filterLands:[]
  }


initMap=()=>{
  let options = {
    zoom: 14,
    center:{lat: 42.6977082, lng : 23.3218675},
    mapTypeId: 'roadmap'
  }
  //init map
  let map = new window.google.maps.Map(document.getElementById('map'),{options});
  

//--add markers with info on landmarks--//

    landmarks.forEach((landmark)=>{

      let info = landmark.title;
      let infoWindow = new window.google.maps.InfoWindow({
        content: info
      })

      let marker = new window.google.maps.Marker({
        position: landmark.position,
        title: landmark.title,
        map: map,
        animation: window.google.maps.Animation.DROP,
        visible:true,
        active: false
      })
      this.state.markers.push(marker)
      
      //open/close infoWindow on click and set on/off animation
      marker.addListener('click', function(){
        if(marker.active !== false){
          infoWindow.close();
          marker.setAnimation(null);
          marker.active = false
        }else{
          marker.active = true;
          infoWindow.open(map, marker);
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          //console.log(marker.active);
          //console.log(infoWindow.content)
        }
      });
      //close infoWindow and stop marker bouncing by click on map
      map.addListener('click', function(){
        marker.active = false;
        infoWindow.close(map, marker);
        marker.setAnimation(null);
  })
  
  }) 

}



filterLocation =  (query)=>{
  this.setState({
    query
  })

  if(query.length<0){
    this.setState({
      filterLands:landmarks
    })
    
  }else{
    const match = new RegExp(escapeRegExp(query), 'i');
    //console.log(query.length);
    this.setState({
      filterLands: landmarks.filter((landmark)=>match.test(landmark.title)),
    })
    //console.log(this.state.filterLands.length, this.state.filterLands)
  }


}



componentDidMount() {
  window.initMap = this.initMap //connect initMap() with global window context and Google maps can invoke it
  loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCnwe4gdHSLNnqKinZo5WtMFHolUIWNjHk&language=en&callback=initMap')
  this.setState({
    filterLands:landmarks
  })
}




  render() {
    let {query, landmarks, markers, filterLands}=this.state;

    return (

      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Sofia Cultural Map</h1>
        </header>

        <main id="maincontent">

        <Sidebar
        query={query}
        markers={markers}
        filterLocation={this.filterLocation}
        filterLands = {filterLands}
        />

        <Map />

        </main>
      </div>
    );
  }
}

export default App;

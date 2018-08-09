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
    filterLands:[],
    filterMarkers:[]
  }

initMap=()=>{
  let options = {
    zoom: 14,
    center:{lat: 42.6977082, lng : 23.3218675},
    mapTypeId: 'roadmap'
  }
  //init map
  let map = new window.google.maps.Map(document.getElementById('map'),{options});

  let initMarkers = []

//--add markers with info to landmarks--//
    landmarks.forEach((landmark)=>{

      let info = landmark.title;
      let infoWindow = new window.google.maps.InfoWindow({
        content: info
      })

      let marker = new window.google.maps.Marker({
        position: landmark.position,
        title: landmark.title,
        id:landmark.id,
        map: map,
        animation: window.google.maps.Animation.DROP,
        visible:true,
        active: false
      })
      initMarkers.push(marker)
      this.setState({
        markers:initMarkers
      })


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


linkMarkers=()=>{
console.log('Should open infoWindow')
}


/*--filter landmarks--*/
filterLocation =  (query)=>{
  this.setState({
    query
  })

  if(query.length>0){
    const match = new RegExp(escapeRegExp(query), 'i');
    //console.log(query.length);
    this.setState({
      filterLands: landmarks.filter((landmark)=>match.test(landmark.title))
    })
    //console.log(this.state.filterLands.length, this.state.filterLands)

//compare marker's id and filterLand's id
    let {markers}=this.state;
    let {filterLands}=this.state;
    filterLands.forEach((filterLand)=>{
      markers.forEach((marker)=>{
          if(filterLand.id===marker.id){
            
            console.log(marker.title)
          }
      })
    })

  }
}





componentDidMount() {

  window.initMap = this.initMap //connect initMap() with global window context and Google maps can invoke it
  loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCnwe4gdHSLNnqKinZo5WtMFHolUIWNjHk&language=en&callback=initMap')
//this way the full list of locations is desplayed by default: 
  this.setState({
    filterLands:landmarks
  })
}




  render() {
    let {query,
        markers,
        filterLands}=this.state;


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
        linkMarkers = {this.linkMarkers}
        />

        <Map />

        </main>
      </div>
    );
  }
}

export default App;

//authentication errors
/*function gm_authFailure(){
  alert('Something went wrong :(')
}
window.googleError=()=>{
    alert('Something went wrong :(')
  }*/
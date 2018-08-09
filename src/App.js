import React, { Component } from 'react';
import landmarks from './data/landmarks';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import escapeRegExp from 'escape-string-regexp';


//https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
//create script tag and insert it before bundle.js script tag
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
    filteredMarks:[],
    filterLands:[],
    map:''
  }

/*--init map with markers--*/
initMap=()=>{
  let options = {
    zoom: 14,
    center:{lat: 42.6977082, lng : 23.3218675},
    mapTypeId: 'roadmap'
  }

  let map = new window.google.maps.Map(document.getElementById('map'),{options});
  this.setState({
    map
  })

  let initMarkers = [];

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
        active: false
      })
      initMarkers.push(marker);
      this.setState({
        markers:initMarkers,
        filteredMarks: initMarkers
      })
      //console.log(`filterM ${this.state.filteredMarks}`)

      /*--open/close infoWindow on click and set on/off animation--*/
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
      /*-close infoWindow and stop marker bouncing by click on map-*/
      map.addListener('click', function(){
        infoWindow.close(map, marker);
        marker.setAnimation(null);
      })
    })
}


/*--filter landmarks and markers--*/
filterLocation =  (query)=>{
  this.setState({
    query
  })

  let {markers,filteredMarks, map}=this.state;

  if(query.length>0){

    const match = new RegExp(escapeRegExp(query), 'i');
    //console.log(query.length);
    this.setState({
      filterLands: landmarks.filter((landmark)=>match.test(landmark.title)),
      filteredMarks: markers.filter((marker)=>match.test(marker.title)),
      map:map
    })
    //console.log(`Yes: ${this.state.filteredMarks.length}`)

    /*--if there is a match => compare marker's id--*/
    setTimeout(()=>{
      markers.forEach((marker)=>{
        marker.setMap(null);//clear all markers
        console.log('clear')

        filteredMarks.forEach((filteredMark)=>{
          if(filteredMark.id===marker.id){//compare markers' ids
            marker.setMap(map);//if there is a match show filtered marker(s)
            console.log('filtered')
          }
        })
      })
    }, 1500)

  }else{
    setTimeout(()=>{
      markers.forEach((marker)=>{
        marker.setMap(map)
        console.log('reset')
      });
      this.setState({
        query:'',
        filterLands: landmarks,
        filteredMarks: markers,
        map: map
      });
    }, 1500)
  }
}



linkMarkers=()=>{
  console.log('Should open infoWindow')
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
        filterLands}=this.state;


    return (

      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Sofia Cultural Map</h1>
        </header>

        <main id="maincontent">

        <Sidebar
        query={query}
        filterLands = {filterLands}
        filterLocation={this.filterLocation}
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
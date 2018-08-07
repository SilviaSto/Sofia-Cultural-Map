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
    markers:[]
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
        visible:true
      })
      this.state.markers.push(marker)
      
      //open infoWindow on click and set animation
      marker.addListener('click', function(){
        infoWindow.open(map, marker)
        if(marker.getAnimation()!==null){
          marker.setAnimation(null)
        }else{
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      });

      //close infoWindow and stop marker bouncing by click on map
      map.addListener('click', function(){
        infoWindow.close(map, marker);
        marker.setAnimation(null);
  })
  }) 
}



filterLocation =  (query)=>{
  this.setState({
    query
  })

  if(query.length>0){
    const match = new RegExp(escapeRegExp(query), 'i');
  }
}



componentDidMount() {
  window.initMap = this.initMap //connect initMap() with global window context and Google maps can invoke it
  loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCnwe4gdHSLNnqKinZo5WtMFHolUIWNjHk&language=en&callback=initMap')
}




  render() {
    let {query, landmarks, markers}=this.state;

    return (

      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Sofia Cultural Map</h1>
        </header>

        <main id="maincontent">

        <Sidebar
        landmarks = {landmarks}
        filterLocation={query}
        markers={markers}
        />

        <Map />

        </main>
      </div>
    );
  }
}

export default App;

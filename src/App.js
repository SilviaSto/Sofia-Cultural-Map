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
  map: '',
  marker:[],
  query:'',
  landmarks:landmarks
}



initMap=()=>{
  let options = {
    zoom: 14,
    center:{lat: 42.6977082, lng : 23.3218675},
    mapTypeId: 'roadmap'
  }
  //init map
  let map = new window.google.maps.Map(document.getElementById('map'),{options});
  //update the state
  this.setState({
    map
  })

//--add markers on landmarks--//

    landmarks.forEach((landmarks)=>{

      let landmarkInfowindow = new window.google.maps.InfoWindow({
        content: 'My text'
      })

      let marker = new window.google.maps.Marker({
        position: landmarks.position,
        title: landmarks.title,
        map: map,
        animation: window.google.maps.Animation.DROP,
        infowindow: landmarkInfowindow
      })
      this.setState({
        marker
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
    let {query}=this.state;

    return (

     

      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Sofia Cultural Map</h1>
        </header>

        <main id="maincontent">

        <Sidebar filterLocation={query}/>

        <Map />

        </main>
      </div>
    );
  }
}

export default App;

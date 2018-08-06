import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';


//https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/

function loadJS(src){ 
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
  console.log(`REf:${ref}`, ref)
  console.log(`Script:${script}`, script)
}



class App extends Component {
 

state = {
  map: ''
}

initMap=()=>{
  let map = new window.google.maps.Map(document.getElementById('map'),{
      center:{lat: 42.6977082,
              lng : 23.3218675} ,
              zoom: 13
  });

  this.setState({
    map: map
  })
  
}


componentDidMount() {
  window.initMap = this.initMap //connect initMap() with global window context and Google maps can invoke it
  loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCnwe4gdHSLNnqKinZo5WtMFHolUIWNjHk&callback=initMap')
}



  render() {

    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Sofia Cultural Map</h1>
        </header>

        <main id="maincontent">

        <Map />
        
        </main>
      </div>
    );
  }
}

export default App;

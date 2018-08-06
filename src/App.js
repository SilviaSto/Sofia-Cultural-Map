import React, { Component } from 'react';
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
  query:''
}

initMap=()=>{
  let map = new window.google.maps.Map(document.getElementById('map'),{
      center:{lat: 42.6977082,
              lng : 23.3218675} ,
              zoom: 13
  });



  let marker = new window.google.maps.Marker({
    position: {lat: 42.6977093,
      lng : 23.3218684},
      map: map,
      title: 'first marker'
  })
  this.setState({
    marker,
    map
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

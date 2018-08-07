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
  query:'',
}



initMap=()=>{
  let options = {
    zoom: 14,
    center:{lat: 42.6977082, lng : 23.3218675},
    mapTypeId: 'roadmap'
  }
  //init map
  let map = new window.google.maps.Map(document.getElementById('map'),{options});

//add markers
  let landmarks = [
    {
      position: {lat: 42.6940929, lng : 23.3266241},
      title: 'National Teather "Ivan Vazov"',
    },{
    position: {lat: 42.6975228, lng : 23.330444},
      title: 'National Opera and Ballet',
    },{
    position: {lat: 42.6963229, lng : 23.3270808 },
     title: 'National Art Gallery',
    },{
    position: {lat: 42.6949318,  lng : 23.335724},
    title: 'National Library',
    },{
    position: {lat: 42.6847251, lng : 23.3189384},
    title: 'National Palace of Culture ',
    }
  ]


    landmarks.forEach((landmarks)=>{
      let marker = new window.google.maps.Marker({
        position: landmarks.position,
        map: map,
        title: landmarks.title,
        animation: window.google.maps.Animation.DROP
      })
      this.setState({
        marker
      })
    })




//update the state
  this.setState({
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

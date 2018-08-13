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
    map:'',
    query:'',
    landmarks:landmarks,
    markers:[],
    info:'',
    filteredMarks:[],
    filterLands:[],
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
    map: map
  })

 this.createMarkers();
}

//--add markers with info to landmarks--//
createMarkers=()=>{
  let {map, info} = this.state;
  let initMarkers = [];

      landmarks.forEach((landmark)=>{

        this.setState({
          info: landmark.id
        })

        let infoWindow = new window.google.maps.InfoWindow({
          content:info
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
          filteredMarks: initMarkers,
        })
        //console.log(`filterM ${this.state.filteredMarks}`)

        /*--open/close infoWindow on click and set on/off animation--*/
        marker.addListener('click', ()=>{
          if(marker.active !== false){
            infoWindow.close();
            marker.setAnimation(null);
            marker.active = false
          }else{
            marker.active = true;
            infoWindow.open(map, marker);
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            //console.log(marker.active);
          }
        });
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

  let {markers, map}=this.state;

  if(query.length>0){

    const match = new RegExp(escapeRegExp(query), 'i');
    //console.log(query.length);
    this.setState({
      filterLands: landmarks.filter((landmark)=>match.test(landmark.title)),
      filteredMarks: markers.filter((marker)=>match.test(marker.title))
    })
    //console.log(`Yes: ${this.state.filteredMarks.length}`)

    /*--if there is a match =>add marker--*/
    setTimeout(()=>{
      this.addMarker();
    }, 1500)

  }else{
    setTimeout(()=>{
      this.resetMarker();

      this.setState({
        map,
        query:'',
        filterLands: landmarks,
        filteredMarks: markers,
      });
    }, 1500)
  }
}


addMarker=()=>{
  let {map, filteredMarks, markers} = this.state

  markers.forEach((marker)=>{
    marker.setMap(null);//clear all markers

    filteredMarks.forEach((filteredMark)=>{
      if(filteredMark.id===marker.id){//compare markers' ids
        filteredMark.setMap(map);//if there is a match show filtered marker(s)
        filteredMark.setAnimation(window.google.maps.Animation.BOUNCE);
      }
    })
  })
}

resetMarker=()=>{
  let {markers, map} = this.state
  markers.forEach((marker)=>{
    marker.setMap(map)
    marker.setAnimation(null);
  });
}


/*--click on a location item and activate the corresponding marker--*/
linkMarkers=(event)=>{
  let {markers} = this.state
  markers.forEach((marker)=>{
    if(marker.title===event.target.innerHTML){  
      //console.log(event.target.innerHTML) e.target refers to the innerHTML of clicked element 
    window.google.maps.event.trigger(marker, 'click') //https://stackoverflow.com/questions/2730929/how-to-trigger-the-onclick-event-of-a-marker-on-a-google-maps-v3/2731781#2731781
    }
  })
}


componentDidMount() {
  window.initMap = this.initMap //connect initMap() with global window context and Google maps can invoke it
  loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCnwe4gdHSLNnqKinZo5WtMFHolUIWNjHk&language=en&callback=initMap')
//this way the full list of locations is desplayed by default: 
  this.setState({
    filterLands:landmarks
  })
  this.getInfo();
}



getInfo=()=>{
  let {landmarks}=this.state
  if(landmarks.length>0){
    landmarks.forEach((landmark)=>{
      let cl_Id = 'GFY1ODZCOH4VCB01SYTYFSBC5MN0UZH1KGTQRC3DB0FWRMX0'
      let cl_Secret = 'HUEHLQU10QM02HORIB31E5G05CDUSAHS5USMDLFISN0KQKNP'
      let v_Id = landmark.id

        fetch(`https://api.foursquare.com/v2/venues/${v_Id}/likes?client_id=${cl_Id}&client_secret=${cl_Secret}&v=20180806`)
          .then(response=>response.json())
          .then(likes=> this.setState({
            info: likes.counts
          }),
        console.log(this.state.info))
          .catch(error =>console.log('parsing failed', error))
    })
  }
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

        <footer id='footer'tabIndex='0'>
          API which are used
        </footer>
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
import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

class App extends Component {

  state={
    query:''
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sofia Cultural Map</h1>
        </header>

        <main id="maincontent">
          
        
        <Map />
        
        <Sidebar />
        
        </main>
      </div>
    );
  }
}

export default App;

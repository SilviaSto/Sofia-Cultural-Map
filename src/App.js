import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';

class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Sofia Cultural Map</h1>
        </header>
        <Sidebar />
      </div>
    );
  }
}

export default App;

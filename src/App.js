import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherReportContainer from './WeatherReport/WeatherReportContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherReportContainer />        
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Cards from './components/Cards';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <Cards />
      </div>
    );
  }
}

export default App;

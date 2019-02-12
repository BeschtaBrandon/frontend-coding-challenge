import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Cards from './components/Cards';

import './App.css';

class App extends Component {

  state = {
    currentCampaign: '',
    campaigns: [],
  };

  updateCurrentCampaign = currentCampaign => {
    this.setState({currentCampaign})
  }

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callCampaignsAPI()
      .then(res => this.setState({ campaigns: res }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callCampaignsAPI = async () => {
    const response = await fetch('/getCampaigns');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar updateCurrentCampaign={this.updateCurrentCampaign} campaigns={this.state.campaigns}/>
        </header>
        <Cards currentCampaign={this.state.currentCampaign}/>
      </div>
    );
  }
}

export default App;

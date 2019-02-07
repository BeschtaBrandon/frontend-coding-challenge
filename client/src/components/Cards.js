import React, {Component} from 'react';
import {Cards} from 'react-bootstrap';

class Cards extends Component {

  state = {
    cardsInfo: [],
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callCardsAPI()
      .then(res => this.setState({ cardsInfo: res }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callCardsAPI = async () => {
    const response = await fetch('/getCards');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Cards;

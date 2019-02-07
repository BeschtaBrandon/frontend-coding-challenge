import React, {Component} from 'react';
import {Card, ProgressBar} from 'react-bootstrap';

import './Cards.css';

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


  renderCards = () => {

    return (
      <div className="row">
        {this.state.cardsInfo.map((card, key) => {
          return (
            <Card key={key} className="card col-xs-4" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={card.primaryMediaUrl} />
              <Card.Body>
                <Card.Title>{card.cardTitle}</Card.Title>
                <Card.Text>
                  {card.cardDescription}
                </Card.Text>
                <ProgressBar now={card.likes} />
              </Card.Body>
              <Card.Footer className="text-muted"><i class="fas fa-user-friends"></i>{card.shares}<i class="far fa-eye"></i>{card.views}</Card.Footer>
            </Card>
          );
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="cards container">
        {this.renderCards()}
      </div>
    );
  }
}

export default Cards;

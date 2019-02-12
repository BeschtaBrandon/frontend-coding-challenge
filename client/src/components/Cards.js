import React, {Component} from 'react';
import {Card, ProgressBar} from 'react-bootstrap';

import './Cards.css';

class Cards extends Component {

  state = {
    cardsInfo: [],
    currentCampaign: '',
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callCardsAPI()
      .then(res => this.setState({ cardsInfo: res }))
      .catch(err => console.log(err));
  }

  // Get request for fetching cards data.
  callCardsAPI = async () => {
    const response = await fetch('/getCards');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  renderEmptyCard = () => {
    return (
      <a className="card card-empty">
        <div>
          <span className="fa fa-plus"/>
          <h4>Create a Service Card</h4>
        </div>
      </a>
    )
  }

  renderCards = () => {
    const currFilter = this.props.currentCampaign;
    const cards = currFilter ? this.state.cardsInfo.filter(ele => ele.campaignId === currFilter) : this.state.cardsInfo;

    return (
      <div className="row">
        {cards.map((card, key) => {
          return (
            <Card key={key} className="card col-xs-4" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={card.primaryMediaUrl} />
              <Card.Body>
                <Card.Text>
                  {card.cardDescription}
                </Card.Text>
                <p><small>{card.listOfPlans[0].price.currencySymbol} {card.listOfPlans[0].price.amount} / Month</small></p>
                <ProgressBar now={card.likes} />
              </Card.Body>
              <Card.Footer className="text-muted"><i className="fas fa-user-friends"></i>{card.shares}<i className="far fa-eye"></i>{card.views}</Card.Footer>
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
        {this.renderEmptyCard()}
      </div>
    );
  }
}

export default Cards;

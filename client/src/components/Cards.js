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
      <div className="row">
        <a className="card card-empty col-xs-8 col-sm-6 col-md-3">
          <div>
            <i className="fa fa-plus-circle"></i>
            <h4>Create a Service Card</h4>
          </div>
        </a>
      </div>
    )
  }

  renderCards = () => {
    const currFilter = this.props.currentCampaign;
    const cards = currFilter ? this.state.cardsInfo.filter(ele => ele.campaignId === currFilter) : this.state.cardsInfo;

    return (
      <div className="row justify-content-md-center">
        {cards.map((card, key) => {
          return (
            <div className="col-xs-8 col-sm-6 col-md-3" key={key}>
              <Card>
                <Card.Img variant="top" src={card.primaryMediaUrl} />
                <Card.Body>
                  <Card.Text>
                    {card.cardDescription}
                  </Card.Text>
                  <p><small>{card.listOfPlans[0].price.currencySymbol} {card.listOfPlans[0].price.amount} / Month</small></p>
                  <ProgressBar now={card.likes} />
                </Card.Body>
                <Card.Footer className="text-muted">
                  <i className="fas fa-user-friends"></i>{card.shares}
                  <div className="pull-right">
                    <i className="far fa-eye"></i>
                    {card.views}
                  </div>
                </Card.Footer>
            </Card>
            </div>
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

import React, {Component, Fragment} from 'react';
import {Badge, Nav, Form, Button, Navbar, NavDropdown} from 'react-bootstrap';
import './NavBar.css';

class NavBar extends Component {

  state = {
    campaigns: [],
  };

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

  renderNavbar = () => {
    const date = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const calendar = <Fragment>
                      <i className="fas fa-angle-left text-danger"></i>
                      <i className="far fa-calendar text-danger"></i>
                      <p className="calendar-date text-danger">Today, {months[date.getMonth()]} {date.getDay()}</p>
                      <i className="fas fa-angle-right text-danger"></i>
                    </Fragment>;

    const pill = <div><Badge pill variant="danger">{date.getDay()}d</Badge></div>;
    return (
      <Navbar className="col-xs-12" bg="light" expand="lg">
        <Nav className="campaign">
          <NavDropdown title="All Campaigns" id="basic-nav-dropdown">
            {this.state.campaigns.map((ele, key) => {
              return <NavDropdown.Item key={ele.id}>{ele.campaignName}</NavDropdown.Item>
            })}
          </NavDropdown>
          <div>
            <i className="fas fa-list"></i>
            {' '}
            <Navbar.Brand>Pending</Navbar.Brand>
          </div>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="searchcalendar justify-content-end">
          <Form inline>
            <Button variant="outline-success"><i className="fas fa-search"></i></Button>
          </Form>
          {calendar}
          {pill}
        </Navbar.Collapse>
      </Navbar>
    );
  }

  render() {
    return (
      <div>
        {this.renderNavbar()}
      </div>
    );
  }
}

export default NavBar;

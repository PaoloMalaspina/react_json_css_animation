import React, { Component } from 'react';

import Navbar  from 'react-bootstrap/lib/Navbar';
import Nav  from 'react-bootstrap/lib/Nav';
import NavItem  from 'react-bootstrap/lib/NavItem';

import Grid  from 'react-bootstrap/lib/Grid';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';

class AppNavBar extends Component {
  render() {
    return (
      <Navbar id={this.props.id}  className={"navbar-fixed-top " +this.props.className} fluid>
        <Grid id="GridNav"  >
          <Row className="show-grid">
            <Col sm={12}>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#home">
                    <img src={this.props.logo} className="App-logo" alt="logo" />
                  </a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav className="menutop">
                <NavItem eventKey={1} href="#">
                  LOREM
                </NavItem>
                <NavItem eventKey={2} href="#">
                  IPSUM
                </NavItem>
                <NavItem eventKey={3} href="#">
                  DOLOR
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Grid>
      </Navbar>
    );
  }
}

export default AppNavBar;

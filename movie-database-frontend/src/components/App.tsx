import React, { PureComponent, ComponentProps } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Routes from './Routes';
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { AppContext } from "../lib/contextLib";
import '../styles/App.css';

class App extends PureComponent<RouteComponentProps> {

  constructor(props:RouteComponentProps) {
    super();
    this.state = {};
    this.navigate = this.navigate.bind(this);
  }

  navigate(e:any, path:any) {
    e.preventDefault();
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="app">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <Navbar.Brand className="font-weight-bold text-muted">
            Movie Database
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              <LinkContainer to="/signup">
                <Nav.Link>Signup</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/*<AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>*/}
          <Routes/>
        {/*</AppContext.Provider>*/}
      </div>
    )
  }
}

export default withRouter(App);
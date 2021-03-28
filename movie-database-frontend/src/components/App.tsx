import React, { Component, ComponentProps } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Routes from './Routes';
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import '../styles/App.css';
interface AppState {
  isAuthenticated:boolean
}
class App extends Component<RouteComponentProps, AppState> {

  constructor(props:RouteComponentProps) {
    super(props);
    const authBool = !!(localStorage.getItem('token') && localStorage.getItem('id'))
    this.state = {
      isAuthenticated: authBool
    };
    this.navigate = this.navigate.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  navigate(e:any, path:any) {
    e.preventDefault();
    this.props.history.push(path);
  }
  async handleLogout(){
    const response = await fetch('http://movie-database.pl/auth/logout',
      {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    if(response.ok){
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      await this.setState({
        isAuthenticated: false
      })
      window.location.reload()
    }
  }

  componentDidMount() {
    const authBool = !!(localStorage.getItem('token') && localStorage.getItem('id'))
    this.setState({
      isAuthenticated: authBool
    })
  }

  render() {
    // const authBool = !!(localStorage.getItem('token') && localStorage.getItem('id'))
    // this.setState({
    //   isAuthenticated: authBool
    // })
    return (
      <div className="app">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <Navbar.Brand className="font-weight-bold text-muted">
            Movie Database
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              { this.state.isAuthenticated ?
                (<Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>)
                :
                (<>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>)
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/*<AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>*/}
          <Routes {...this.state}/>
        {/*</AppContext.Provider>*/}
      </div>
    )
  }
}

export default withRouter(App);
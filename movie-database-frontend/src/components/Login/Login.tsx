import React, {PureComponent, ComponentPropsWithRef} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../styles/Login/Login.css';
import { withRouter } from "react-router";

interface LoginState {
  email: string
  password: string
}
class Login extends PureComponent<ComponentPropsWithRef<any>, LoginState> {
  constructor(props:ComponentPropsWithRef<any>) {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setEmail(email:string) {
    this.setState({
      email: email
    })
  }

  setPassword(password:string) {
    this.setState({
      password: password
    })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  async handleSubmit(event:any) {
    event.preventDefault();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email || ''}
              onChange={(e) => this.setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group  controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password || ''}
              onChange={(e) => this.setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!this.validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
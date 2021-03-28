import React, {PureComponent, useState, ComponentPropsWithRef} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../styles/App.css';
import {RouteComponentProps} from "react-router-dom";
import { withRouter } from "react-router";
import '../../styles/Signup/Signup.css'

interface SignupState {
  email: string
  password: string
  confirmPassword: string
}
class Signup extends PureComponent<ComponentPropsWithRef<any>, SignupState> {


  constructor(props:RouteComponentProps) {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
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

  setConfirmPassword(password:string) {
    this.setState({
      confirmPassword: password
    })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword;
  }

  handleSubmit(event:any) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Signup">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" >
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={(e) => this.setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={(e) => this.setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => this.setConfirmPassword(e.target.value)}
              value={this.state.confirmPassword}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!this.validateForm()}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(Signup);
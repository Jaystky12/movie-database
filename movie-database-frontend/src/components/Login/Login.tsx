import React, {PureComponent, useState, ComponentPropsWithRef} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../styles/App.css';
import {RouteComponentProps} from "react-router-dom";

interface LoginState {
  email: string
  password: string
}
export default class Login extends PureComponent<ComponentPropsWithRef<any>, LoginState> {

  email: any = ''
  password: any = ''

  constructor(props:RouteComponentProps) {
    super();
    this.state = {
      email: '',
      password: ''
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

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event:any) {
    event.preventDefault();
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
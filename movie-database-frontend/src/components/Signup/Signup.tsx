import React, {Component, useState, ComponentPropsWithRef} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../styles/App.css';
import {RouteComponentProps} from "react-router-dom";
import { withRouter } from "react-router";
import '../../styles/Signup/Signup.css'

interface SignupState {
  email: string
  password: string
  confirmPassword: string,
  name: string
}
class Signup extends Component<ComponentPropsWithRef<any>, SignupState> {


  constructor(props:RouteComponentProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
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

  setConfirmPassword(password:string) {
    this.setState({
      confirmPassword: password
    })
  }

  setName(name:string) {
    this.setState({
      name: name
    })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length > 0 && this.state.password === this.state.confirmPassword;
  }

  async handleSubmit(event:any) {
    event.preventDefault();
    try {
      const response = await fetch(`http://movie-database.pl/auth/register`, {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password})
      })

      if (response.ok) {
        console.log(await response.json())
      } else {
        throw new Error(String(response.status))
      }

    } catch (error) {
      console.log(error + ': Invalid email')
    }
  }

  render() {
    return (
      <div className="Signup">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name" >
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.name}
              onChange={(e) => this.setName(e.target.value)}
            />
          </Form.Group>
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
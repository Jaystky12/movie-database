import React, { PureComponent } from 'react';
import '../../styles/Home/Home.css';

export default class Home extends PureComponent {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Movie Database</h1>
          <p className="text-muted">A simple page to browse movies from omdb</p>
        </div>
      </div>
    )
  }
}
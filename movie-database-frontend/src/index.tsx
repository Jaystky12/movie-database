//import React
import React from 'react';
//import the named export called render from react-dom that will render your virtual dom.
import { render } from 'react-dom';
//import your app component from your app.js file in your components folder.
import App from './components/App';

render(<App />, document.getElementById("root"));
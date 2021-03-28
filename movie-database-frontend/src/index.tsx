import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import {BrowserRouter as R} from 'react-router-dom';

render(<R><App /></R>, document.getElementById("root"));
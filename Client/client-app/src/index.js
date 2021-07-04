import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);



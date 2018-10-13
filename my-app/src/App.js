import React, { Component } from 'react';
// import './App.css';
import Community from './Community/Community.js';
import Employment from './Employment/Employment.js';
import Health from './Health/Health.js';
import Skills from './Skills/Skills.js';
import Home from './Home.js';
import { Grid, Image, Header, Icon, Button } from 'semantic-ui-react';
// import { Router, Route, Switch } from 'react-router';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
    };
  }

  render() {
    return (
      <Router>
      <div className="App">
       <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/community" component={Community} />
            <Route path="/employment" component={Employment} />
            <Route path="/health" component={Health} />
            <Route path="/skills" component={Skills} />
       </Switch>
      </div>
      </Router>
     
    );
  }
}

export default App;

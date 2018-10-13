import React, { Component } from 'react';
import Community from './Community/Community.js';
import Employment from './Employment/Employment.js';
import Health from './Health/Health.js';
import Skills from './Skills/Skills.js';
import { Grid, Image, Header, Icon, Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

class Home extends Component {
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
          <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>Welcome to St. Louis</Header.Content>
          </Header>
          <Grid container verticalAlign='middle' columns={4} centered>
            <Grid.Row>
              <Grid.Column>
              <Header size='huge'>COMMUNITY</Header>
              <NavLink to="/community">
                <Button onClick={() => console.log('im in')}>Access Like Minded People</Button>
              </NavLink>
              </Grid.Column>
              <Grid.Column>
              <Header size='huge'>EMPLOYMENT</Header>
              <NavLink to="/employment">
                <Button onClick={() => console.log('im here')}>Find the right job</Button>
              </NavLink>
              <br />
              <Header size='huge'>HEALTH</Header>
              <NavLink to="/health">
              <Button>Health-based services</Button>
              </NavLink>
              </Grid.Column>
              <Grid.Column>
              <Header size='huge'>SKILLS</Header>
              <NavLink to="/skills">
              <Button>Get the Skills you need</Button>
              </NavLink>
              </Grid.Column>
            </Grid.Row>
           </Grid>
           <Switch>
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

export default Home;
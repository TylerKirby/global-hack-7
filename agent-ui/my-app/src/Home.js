import React, { Component } from 'react';
import Community from './Community/Community.js';
import Employment from './Employment/Employment.js';
import Health from './Health/Health.js';
import Skills from './Skills/Skills.js';
import CardComponent from './CardComponent/CardComponent.js';
import { Grid, Image, Header, Icon, Button, Divider, Segment, Flag } from 'semantic-ui-react';
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
          <div className="App">
          <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>Welcome to St. Louis</Header.Content>
          </Header>
          <br></br>
          <br></br>
          <Grid container verticalAlign='middle' columns={4} centered>
            <Grid.Row>
              <Grid.Column width='five' color='orange'>
              <Header textAlign='center' size='huge'>COMMUNITY</Header>
              <NavLink to="/community">
                <Button fluid='true' onClick={() => console.log('im in')}>Access Like Minded People</Button>
              </NavLink>
              </Grid.Column>
              <Grid.Column color='green' width='five'>
              <Header textAlign='center' size='huge'>EMPLOYMENT</Header>
              <NavLink to="/employment">
                <Button fluid='true' onClick={() => console.log('im here')}>Find the right job</Button>
              </NavLink>
              <Divider inverted='true'/>
              <Header textAlign='center' size='huge'>HEALTH</Header>
              <NavLink to="/health">
              <Button fluid='true'>Health-based services</Button>
              </NavLink>
              </Grid.Column>
              <Grid.Column color='blue' width='five'>
              <Header textAlign='center' size='huge'>SKILLS</Header>
              <NavLink to="/skills">
              <Button fluid='true'>Get the Skills you need</Button>
              </NavLink>
              </Grid.Column>
            </Grid.Row>
           </Grid>
            <br></br>
            <br></br>
           <Segment textAlign='center'>
            <Flag name='ae' />
            <Flag name='af' />
            <Flag name='al' />
            <Flag name='ae' />
            <Flag name='dz' />
            <Flag name='cn' />
            <Flag name='cr' />
            <Flag name='sv' />
            <Flag name='et' />
            <Flag name='ae' />
            <Flag name='it' />
            <Flag name='il' />
            <Flag name='ae' />
            <Flag name='mx' />
            <Flag name='cs' />
            <Flag name='gb' />
            <Flag name='us' />
            <Flag name='tw' />
            <Flag name='so' />
            <Flag name='kr' />
           </Segment>
                <Route exact path="/community" component={Community} />
                <Route path="/employment" component={Employment} />
                <Route path="/health" component={Health} />
                <Route path="/skills" component={Skills} />
          </div>
        );
      }
}

export default Home;
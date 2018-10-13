import React, { Component } from 'react';
import './App.css';
import { Button, Container, Form, Menu } from 'semantic-ui-react';
import { ContactInfo } from 'components/ContactInfo';
import { SkillInfo } from 'components/SkillInfo';

class App extends Component {
  state = {
    activePanel: null,
    showRegisterClient: false,
  };

  handleRegisterClientClick = () => {
    this.setState({ showRegisterClient: true, activePanel: 'contactInfo' });
  };

  handleCancelClick = () => {
    this.setState({ showRegisterClient: false });
  };

  handleItemClick = (event, { name }) => {
    this.setState({ activePanel: name });
  };

  showHide = (show) => show ? { display: 'inherit' } : { display: 'none' };

  render() {
    const { showRegisterClient, activePanel } = this.state;

    return (
      <Container>
        <Button onClick={this.handleRegisterClientClick}>Register Client</Button>

        <Container style={this.showHide(showRegisterClient)}>
          <Menu pointing secondary>
            <Menu.Item onClick={this.handleItemClick}
                       name='contactInfo'
            >
              Contact
            </Menu.Item>
            <Menu.Item onClick={this.handleItemClick}
                       name='skillInfo'
            >
              Skills
            </Menu.Item>
          </Menu>

          <Form>
            <ContactInfo
              style={this.showHide(activePanel === 'contactInfo')}/>
            <SkillInfo
              style={this.showHide(activePanel === 'skillInfo')}/>

            <Button>Save</Button>
            <Button onClick={this.handleCancelClick}>Cancel</Button>

          </Form>
        </Container>
      </Container>
    );
  }
}

export default App;

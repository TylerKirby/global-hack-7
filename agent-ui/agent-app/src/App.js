import React, { Component } from 'react';
import './App.css';
import { Button, Container, Menu } from 'semantic-ui-react';
import { ClientEntry } from 'components/ClientEntry';
import { ApolloProvider } from 'react-apollo';
import { apollo } from 'api/apollo';

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

  handleSaveClick = () => {

  };

  handleClientDataChange = (client) => {

  };

  handleItemClick = (event, { name }) => {
    this.setState({ activePanel: name });
  };

  showHide = (show) => show ? { display: 'inherit' } : { display: 'none' };

  render() {
    const { showRegisterClient, activePanel } = this.state;

    return (
      <ApolloProvider client={apollo}>
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
            <ClientEntry
              onSave={() => console.log('save')}
              onCancel={this.handleCancelClick}
              onChange={this.handleClientDataChange}
              style={this.showHide(activePanel === 'contactInfo')}/>
          </Container>
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;

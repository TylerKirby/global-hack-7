import React, { Component } from 'react';
import './App.css';
import { Button, Container, Header, Input, Item, Message } from 'semantic-ui-react';
import { ClientEntry } from 'components/ClientEntry';
import { ApolloProvider } from 'react-apollo';
import { apollo } from 'api/apollo';
import { getAllClients } from 'api/client-api';
import { FONT_FAMILY, primaryButton } from 'common-css';
import _ from 'lodash';

class App extends Component {
  state = {
    showRegisterClient: false,
    results: [],
    searchValue: '',
    showInviteSentMessage: false,
    invitedClient: {},
  };

  handleRegisterClientClick = () => {
    this.setState({ showRegisterClient: true, activePanel: 'contactInfo' });
  };

  handleCancelClick = () => {
    this.setState({ showRegisterClient: false });
  };

  handleSaveClick = () => {
    this.setState({ showRegisterClient: false });
  };

  handleClientDataChange = (client) => {
    this.setState({ showRegisterClient: false });
  };

  handleClientSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, searchValue: value });
  };

  handleClientSearchClick = () => {
    getAllClients(this.state.searchValue).then((result) => {
      const searchResults = result.data.allInstabilties
          .filter((client) => `${client.firstName} ${client.lastName}`.toLowerCase().includes(this.state.searchValue))
        // .map((client) => {
        //   return {
        //     childKey: client.id,
        //     header: `${_.capitalize(client.firstName)} ${_.capitalize(client.lastName)}`,
        //     description: `${_.capitalize(client.country)} - ${_.capitalize(client.ethnicity)}`,
        //     extra: `Phone: ${client.phoneNumber} Email: ${client.email}`
        //   };
        // })
      ;

      this.setState({
        isLoading: false,
        results: searchResults,
      });
    });
  };

  handleSendInviteClick = (client) => {
    this.setState({ showInviteSentMessage: !this.state.showInviteSentMessage, invitedClient: client });

    setTimeout(() => {
      this.setState({ showInviteSentMessage: false });
    }, 5000);
  };


  handleDismissSentInvite = () => {
    this.setState({ showInviteSentMessage: false });
  };

  render() {
    const { showRegisterClient, results, showInviteSentMessage, invitedClient } = this.state;

    return (
      <ApolloProvider client={apollo}>
        <Container style={{ marginTop: 12 }}>
          <Header as='h1'>Stabilty | Invite</Header>
          {showRegisterClient ?
            <Container>
              <ClientEntry
                onSave={this.handleSaveClick}
                onCancel={this.handleCancelClick}
                onChange={this.handleClientDataChange}/>
            </Container> :
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Input
                  style={{ flex: 5, marginRight: 8 }}
                  icon='search'
                  placeholder='Search for clients...'
                  onChange={this.handleClientSearchChange}
                />
                <Button
                  onClick={this.handleClientSearchClick}
                  style={{ ...primaryButton, flex: 1 }}
                >Search</Button>
                <Button
                  onClick={this.handleRegisterClientClick}
                  style={{ ...primaryButton, flex: 1 }}
                >New Client</Button>
              </div>

              {
                showInviteSentMessage ?
                  <Message
                    positive
                    onDismiss={this.handleDismissSentInvite}
                  >
                    <Message.Header>Sent Invite</Message.Header>
                    <div>Stability invite sent to {_.capitalize(invitedClient.firstName)} {_.capitalize(invitedClient.lastName)}</div>
                  </Message> :
                  null
              }

              <Header as='h1'>Search Results</Header>
              {
                results && results.length > 0 ?
                  <Item.Group divided>
                    {
                      results.map((result) => (
                        <Item>
                          <Item.Content>
                            <Item.Header>{_.capitalize(result.firstName)} {_.capitalize(result.lastName)}</Item.Header>
                            <Item.Description>{_.capitalize(result.country)} - {_.capitalize(result.ethnicity)}</Item.Description>
                            <Item.Extra>
                              <div>Phone: {result.phoneNumber} Email: {result.email}</div>
                              <Button onClick={() => this.handleSendInviteClick(result)}>Send Invite</Button>
                            </Item.Extra>
                          </Item.Content>
                        </Item>
                      ))
                    }

                  </Item.Group> :
                  <Header>Enter search information above to find a client.</Header>
              }
            </div>
          }

        </Container>
      </ApolloProvider>
    );
  }
}

const styles = (
  {
    body: {
      backgroundColor: '#FCFCFC',
      fontFamily: FONT_FAMILY,
    },
    searchInput: {},
  }
);

export default App;

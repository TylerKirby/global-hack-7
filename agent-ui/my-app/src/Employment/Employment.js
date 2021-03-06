import React, { Component } from 'react';
import { Container, Button, Header, Icon, Card, Image } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';



const client = new ApolloClient({
  uri: "http://localhost:4000/stabilty_orgs/orgs"
});

class Employment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employmentResult: [],
    };
  }

  async componentDidMount(){
    await client.query({
      query: gql`
        query {
          employmentOpportunitiesForId(id: "U2FsdGVkX187bpz2ss67++slmWh8EEIDKj1wTYyO9Ks=") {
            name
            _id
            type
            description
            imageUrl
          }
        }
      `
      })
      .then(result => {
        const data = result.data.employmentOpportunitiesForId
        const collection = data.map(values => {
          return values;
        })
        this.setState({employmentResult: collection})
      })
  }

  render() {
    if (this.state.employmentResult[0]){
        return (
          <div className="Employment">
          <Container>
            <Header as='h2' icon textAlign='center'>
              <Icon name='briefcase' circular />
              <Header.Content>JOB ACCESS</Header.Content>
            </Header>
            <div>
             {this.state.employmentResult.map(employment => {
               return( 
                 <div>
                <NavLink to="/CardComponent">
                <Card>
                <Image>${employment.imageUrl}</Image>
                <Card.Content>
                  <Card.Header>${employment.name}</Card.Header>
                  <Card.Description>${employment.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    Contact
                  </a>
                </Card.Content>
                </Card>
                </NavLink>
                <br/>
                </div>
               )
             })}
            </div>
          </Container>
          </div>
        );
    
  } else {
      return (
        <div></div>
      )
    }
  }
}

export default Employment;

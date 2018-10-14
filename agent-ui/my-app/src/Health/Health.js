import React, { Component } from 'react';
import { Container, Button, Header, Icon, Card, Image } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class Health extends Component {

  constructor(props) {
    super(props);
    this.state = {
      healthResult: [],
    };
  }

  async componentDidMount(){
    await client.query({
      query: gql`
        query {
          healthOpportunitiesForId(id: 4) {
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
        const data = result.data.healthOpportunitiesForId
        const collection = data.map(values => {
          return values;
        })
        this.setState({healthResult: collection})
      })
  }

  render() {
    if (this.state.healthResult[0]){
        return (
          <div className="Health">
          <Container>
            <Header as='h2' icon textAlign='center'>
              <Icon name='heartbeat' circular />
              <Header.Content>HEALTHCARE</Header.Content>
            </Header>
            <div>
             {this.state.healthResult.map(health => {
               return( 
                 <div>
                <Card>
                <Image>${health.imageUrl}</Image>
                <Card.Content>
                  <Card.Header>${health.name}</Card.Header>
                  <Card.Description>${health.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='medical professional' />
                    Contact
                  </a>
                </Card.Content>
                </Card>
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

export default Health;
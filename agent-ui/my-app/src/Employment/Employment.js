import React, { Component } from 'react';
import { Container, Button, Header, Icon, Card, Image } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


const client = new ApolloClient({
  uri: "http://localhost:4000/"
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
          employmentOpportunitiesForId(id: 4) {
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

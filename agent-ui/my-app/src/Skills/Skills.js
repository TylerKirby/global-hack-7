import React, { Component } from 'react';
import { Container, Button, Header, Icon, Card, Image } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class Skills extends Component {

  constructor(props) {
    super(props);
    this.state = {
      skillResult: [],
    };
  }

  async componentDidMount(){
    await client.query({
      query: gql`
        query {
          skillOpportunitiesForId(id: 4) {
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
        const data = result.data.skillOpportunitiesForId
        const collection = data.map(values => {
          return values;
        })
        this.setState({skillResult: collection})
      })
  }

  render() {
    if (this.state.skillResult[0]){
        return (
          <div className="Health">
          <Container>
            <Header as='h2' icon textAlign='center'>
              <Icon name='graduation cap' circular />
              <Header.Content>ACADEMIA/SKILLS</Header.Content>
            </Header>
            <div>
             {this.state.skillResult.map(skill => {
               return( 
                 <div>
                <Card>
                <Image>${skill.imageUrl}</Image>
                <Card.Content>
                  <Card.Header>${skill.name}</Card.Header>
                  <Card.Description>${skill.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='academia' />
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

export default Skills;
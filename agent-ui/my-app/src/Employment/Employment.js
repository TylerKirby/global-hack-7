import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class Employment extends Component {
  componentDidMount(){
    client.query({
          query: gql`
      query {
        employmentOpportunitiesForId(id: 4) {
          name
          id
          type
          description
          imageUrl
        }
      }
    `
        })
        .then(result => console.log(result));

  }
  render() {
    return (
      <div className="Employment">
      <Container>
        <h1>EMPLOYMENT</h1>
        <Button >Find the right job</Button>
      </Container>
      </div>
    );
  }
}

export default Employment;

import React from 'react';
import {
  Container, Content, Text, Header,
} from 'native-base';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import CustomCard from '../components/CustomCard';


const GET_COMMUNITY_DATA = gql`
{
  query { 
    stabilityOptionsForId(id: 4) {
    name
    id
    type
    description
    imageUrl
    }
  }
}
`;

const CommunityScreen = () => (
  <Query query={GET_COMMUNITY_DATA}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <Container>
          <Header>
            <Text>Community</Text>
          </Header>
          <Content>
            <CustomCard
              title={data.name}
              description={data.description}
              phoneNumber="123-456-7890"
              imageUri={data.imageUrl}
            />
          </Content>
        </Container>
      );
    }}

  </Query>

);

export default CommunityScreen;

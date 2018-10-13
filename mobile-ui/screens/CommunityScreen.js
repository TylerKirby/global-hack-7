import React from 'react';
import {
  Container, Content, Text, Header,
} from 'native-base';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import CustomCard from '../components/CustomCard';


const GET_COMMUNITY_DATA = gql`
query { 
  stabilityOptionsForId(id: 4) {
    name
    type
    description
    imageUrl
  }
}
`;

class CommunityScreen extends React.Component {
  handleOnPress = () => this.props.navigation.navigate('DetailsScreen');

  render() {
    return (
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
                {
                  data.stabilityOptionsForId.map(e => (
                    <CustomCard
                      key={e.name}
                      title={e.name}
                      description={e.description}
                      phoneNumber="123-456-7890"
                      imageUri={e.imageUrl}
                      onPress={this.handleOnPress}
                    />))
                }
              </Content>
            </Container>
          );
        }}

      </Query>
    );
  }
}

export default CommunityScreen;

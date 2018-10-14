import React from 'react';
import { Content, Container } from 'native-base';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import CustomHeader from '../components/CustomHeader';
import CustomCard from '../components/CustomCard';

const GET_HEALTH_DATA = gql`
query { 
  healthOpportunitiesForId(id: 4) {
    name
    type
    description
    imageUrl
    _id
  }
}
`;

class HealthScreen extends React.Component {
  handleOnPress = () => this.props.navigation.navigate('DetailsScreen');

  render() {
    return (
      <Query query={GET_HEALTH_DATA}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Container>
              <CustomHeader headerTitle="Health" />
              <Content>
                {
                  data.healthOpportunitiesForId.map(e => (
                    <CustomCard
                      key={e._id}
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

export default HealthScreen;


import React from 'react';
import { Content, Container } from 'native-base';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import CustomHeader from '../components/CustomHeader';
import CustomCard from '../components/CustomCard';

const GET_SKILLS_DATA = gql`
query { 
  skillOpportunitiesForId(id: 1) {
    name
    type
    description
    imageUrl
    _id
  }
}
`;

class SkillsScreen extends React.Component {
  handleOnPress = () => this.props.navigation.navigate('DetailsScreen');

  render() {
    return (
      <Query query={GET_SKILLS_DATA}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Container>
              <CustomHeader headerTitle="Skills" />
              <Content>
                {
                  data.skillOpportunitiesForId.map(e => (
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

export default SkillsScreen;


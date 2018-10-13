import React from 'react';
import { Container, Content, Text, Header } from 'native-base';

import CustomCard from '../components/CustomCard';


const CommunityScreen = () => (
  <Container>
    <Header>
      <Text>Community</Text>
    </Header>
    <Content>
      <CustomCard 
        title="Community Place"
        description="It's the place for community"
        phoneNumber="123-456-7890"
        imageUri="/photo"
      />
    </Content>
  </Container>
);

export default CommunityScreen;

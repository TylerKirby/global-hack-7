import React from 'react';
import { Image } from 'react-native';
import {
  Header, Container, Content, Text, Footer, Left, Icon, Button, Right,
} from 'native-base';


const DetailsScreen = ({ name, description }) => (
  <Container>
    <Header>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Test</Text>
    </Header>
    <Content>
      <Image source={{ uri: 'https://cataas.com/cat/says/hello%20world!' }} style={{ height: 400, width: '100%' }} />
      <Text style={{ padding: 20 }}>test test test</Text>
    </Content>
    <Footer style={{ marginBottom: 20 }}>
      <Button transparent textStyle={{ color: '#87838B' }} style={{ flexDirection: 'column' }}>
        <Icon name="ios-call" />
        <Text>Phone</Text>
      </Button>
      <Button transparent textStyle={{ color: '#87838B' }} style={{ flexDirection: 'column' }}>
        <Icon name="ios-map" />
        <Text>Map</Text>
      </Button>
      <Button transparent textStyle={{ color: '#87838B' }} style={{ flexDirection: 'column' }}>
        <Icon name="ios-desktop" />
        <Text>Website</Text>
      </Button>
    </Footer>
  </Container>
);

export default DetailsScreen;

import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

const CustomCard = ({ title, type, imageUri, description, phoneNumber }) => (
  <Card>
    <CardItem header>
      <Left>
        <Icon name="ios-home" />
        <Text>{title}</Text>
        <Text note>{type}</Text>
      </Left>
    </CardItem>
    <CardItem button onPress={() => console.warn('go away')}>
      <Body>
        <Image source={{ uri: 'https://cataas.com/cat/says/hello%20world!' }} style={{ height: 200, width: '100%' }} />
        <Text>{description}</Text>
      </Body>
    </CardItem>
    <CardItem>
      <Left>
        <Button transparent>
          <Icon name="ios-call"/>
          <Text>{phoneNumber}</Text>
        </Button>
      </Left>
    </CardItem>
  </Card>
);

export default CustomCard;

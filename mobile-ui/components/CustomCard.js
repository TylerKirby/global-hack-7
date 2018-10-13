import React from 'react';
import { Image } from 'react-native';
import {
  Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,
} from 'native-base';

const CustomCard = ({
  title, type, imageUri, description, phoneNumber, onPress,
}) => (
  <Card>
    <CardItem header>
      <Left>
        <Icon name="ios-home" />
        <Text>{title}</Text>
        <Text note>{type}</Text>
      </Left>
    </CardItem>
    <CardItem button onPress={() => onPress()}>
      <Body>
        <Image source={{ uri: 'https://cataas.com/cat/says/hello%20world!' }} style={{ height: 200, width: '100%' }} />
        <Text>{description}</Text>
      </Body>
    </CardItem>
    <CardItem footer style={{ justifyContent: 'flex-start' }}>
      <Button transparent textStyle={{color: '#87838B'}} style={{ flexDirection: 'column' }}>
          <Icon name="ios-call" />
        </Button>
        <Button transparent textStyle={{color: '#87838B'}} style={{ flexDirection: 'column' }}>
          <Icon name="ios-map" />
        </Button>
        <Button transparent textStyle={{color: '#87838B'}} style={{ flexDirection: 'column' }}>
          <Icon name="ios-desktop" />
        </Button>
    </CardItem>
  </Card>
);

export default CustomCard;

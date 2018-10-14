import React from 'react';
import { Image } from 'react-native';
import {
  Card, CardItem, Text, Button, Icon, Left, Body,
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
        <Image source={{ uri:'http://static.wixstatic.com/media/f93ecf_4d86286a76b8b001b66193738d05af99.jpg_1024' }} style={{ height: 200, width: '100%' }} />
        <Text>{description}</Text>
      </Body>
    </CardItem>
    <CardItem footer style={{ justifyContent: 'flex-start' }}>
      <Button transparent textStyle={{ color: '#87838B' }} style={{ flexDirection: 'column' }}>
        <Icon name="ios-call" />
      </Button>
      <Button transparent textStyle={{ color: '#87838B' }} style={{ flexDirection: 'column' }}>
        <Icon name="ios-map" />
      </Button>
      <Button transparent textStyle={{ color: '#87838B' }} style={{ flexDirection: 'column' }}>
        <Icon name="ios-desktop" />
      </Button>
    </CardItem>
  </Card>
);

export default CustomCard;

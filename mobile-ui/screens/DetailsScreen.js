import React from 'react';
import { Image } from 'react-native';
import { Header, Container, Content, Text, Footer, Left, Icon, Button, Right } from 'native-base';


const DetailsScreen = ({ name, description }) => (
  <Container>
    <Header>
      <Text>我们为何用它</Text>
    </Header>
    <Content>
      <Image source={{ uri: 'https://cataas.com/cat/says/hello%20world!' }} style={{ height: 400, width: '100%' }} />
      <Text>无可否认，当读者在浏览一个页面的排版时，难免会被可阅读的内容所分散注意力。Lorem Ipsum的目的就是为了保持字母多多少少标准及平均的分配，而不是“此处有文本，此处有文本”，从而让内容更像可读的英语。如今，很多桌面排版软件以及网页编辑用Lorem Ipsum作为默认的示范文本，搜一搜“Lorem Ipsum”就能找到这些网站的雏形。这些年来Lorem Ipsum演变出了各式各样的版本，有些出于偶然，有些则是故意的（刻意的幽默之类的）。</Text>
    </Content>
    <Footer style={{ marginBottom: 20 }}>
      <Button transparent textStyle={{color: '#87838B'}} style={{ flexDirection: 'column' }}>
        <Icon name="ios-call" />
        <Text>Phone</Text>
      </Button>
      <Button transparent textStyle={{color: '#87838B'}} style={{ flexDirection: 'column' }}>
        <Icon name="ios-map" />
        <Text>Map</Text>
      </Button>
      <Button transparent textStyle={{color: '#87838B'}} style={{ flexDirection: 'column' }}>
        <Icon name="ios-desktop" />
        <Text>Website</Text>
      </Button>
    </Footer>
  </Container>
);

export default DetailsScreen;

import React from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import {
  Container, Header, Content, Button, Text,
} from 'native-base';
import Flag from 'react-native-flags';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import CustomHeader from '../components/CustomHeader';

const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: Dimensions.get('window').width,
  },
});

class DashboardScreen extends React.Component {
  render() {
    return (
      <Container>
        <CustomHeader headerTitle="Welcome!" />
        <Content style={{ paddingTop: 50 }}>
          <Button
            full
            rounded
            style={{ 
              margin: 10,
              height: Dimensions.get('window').width/4,
              backgroundColor: '#26547c'
             }}
            onPress={() => this.props.navigation.navigate('CommunityScreen')}
    
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold'
              }}
            >
              Community
            </Text>
          </Button>
          <Button
            full
            rounded
            style={{ 
              margin: 10,
              height: Dimensions.get('window').width/4,
              backgroundColor: '#ef476f'
             }}
            onPress={() => this.props.navigation.navigate('WorkScreen')}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold'
              }}
            >
              Work
            </Text>
          </Button>
          <Button
            full
            rounded
            style={{ 
              margin: 10,
              height: Dimensions.get('window').width/4,
              backgroundColor: '#ffd166'
             }}
            onPress={() => this.props.navigation.navigate('HealthScreen')}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold'
              }}
            >
              Health
            </Text>
          </Button>
          <Button
            full
            rounded
            style={{ 
              margin: 10,
              height: Dimensions.get('window').width/4,
              backgroundColor: '#06d6a0'
             }}
            onPress={() => this.props.navigation.navigate('SkillsScreen')}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold'
              }}
            >
              Skills
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default DashboardScreen;

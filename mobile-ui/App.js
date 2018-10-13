import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  Container, Header, Content, Button, Text,
} from 'native-base';
import { createStackNavigator } from 'react-navigation';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import CommunityScreen from './screens/CommunityScreen';
import HealthScreen from './screens/HealthScreen';
import SkillsScreen from './screens/WorkScreen';
import WorkScreen from './screens/WorkScreen';
import Dashboard from './screens/DashboardScreen';
import DetailsScreen from './screens/DetailsScreen';


const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: Dimensions.get('window').width,
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
    },
    CommunityScreen: {
      screen: CommunityScreen,
    },
    HealthScreen: {
      screen: HealthScreen,
    },
    WorkScreen: {
      screen: WorkScreen,
    },
    SkillsScreen: {
      screen: SkillsScreen,
    },
    DetailsScreen: {
      screen: DetailsScreen,
    }
  },
  {
    initialRouteName: 'Dashboard',
  },
);

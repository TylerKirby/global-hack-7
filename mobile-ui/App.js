import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import CommunityScreen from './screens/CommunityScreen';
import HealthScreen from './screens/HealthScreen';
import SkillsScreen from './screens/WorkScreen';
import WorkScreen from './screens/WorkScreen';
import Dashboard from './screens/DashboardScreen';
import DetailsScreen from './screens/DetailsScreen';

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
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
    },
  },
  {
    initialRouteName: 'Dashboard',
  },
);

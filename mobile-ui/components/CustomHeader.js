import React from 'react';
import { AsyncStorage } from 'react-native';
import { Header, Text, Button } from 'native-base';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Flag from 'react-native-flags';

const CustomHeader = ({ headerTitle }) => (
  <Header>
  <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{headerTitle}</Text>
</Header>
);
export default CustomHeader;

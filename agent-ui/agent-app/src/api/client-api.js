import gql from 'graphql-tag';

import { apollo } from 'api/apollo';

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;


export const addClientMutation = gql`
  mutation AddAnUnstable($anUnstable: TheUnstableInput!) {
    addAnUnstable(anUnstable: $anUnstable) {
      firstName,
      lastName,
      phoneNumber,
      email,
      ethnicity,
      country
    }
  }
`;

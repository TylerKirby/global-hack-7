import gql from 'graphql-tag';

import { apollo } from 'api/apollo';

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

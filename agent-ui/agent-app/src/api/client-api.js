import gql from 'graphql-tag';

import { apollo } from 'api/apollo';

export async function getAllClients() {
  return await apollo.query({
    query: gql`
      {
        allInstabilties {
         firstName,
         lastName,
         country,
         ethnicity,
         phoneNumber,
         email,
         skills {
          name,
          proficiency
         }
        }
      }
    `,
  });
}

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

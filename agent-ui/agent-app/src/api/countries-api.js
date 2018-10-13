import gql from 'graphql-tag';

import { apollo } from 'api/apollo';

export async function getCountries(prefix) {
  return await apollo.query({
    query: gql`
      {
        countriesThatStartWith(prefix: "${prefix}") {
          name,
          flag
        }      
      }
    `,
  });
}
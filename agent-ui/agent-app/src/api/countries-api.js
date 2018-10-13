import gql from 'graphql-tag';

import { client } from 'api/client';

export const getCountries = async (prefix) => {
  return await client.query({
    query: gql`
      {
        countriesThatStartWith(prefix: "${prefix}") {
          name,
          flag
        }      
      }
    `,
  });
};
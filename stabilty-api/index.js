const {ApolloServer, gql, MockList, AuthenticationError} = require('apollo-server');
const {find, filter} = require('lodash');
const {MoviesAPI} = require('./MoviesAPI');
const {EmploymentAPI} = require('./EmploymentAPI');
const fs = require('fs');
const path = require('path');

const countryInformation = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/randomuser/data/countries.json'), 'utf8'));
// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: {
      id: 2,
      name: 'J.K. Rowling',
      age: 42
    },
  },
  {
    title: 'Jurassic Park',
    author: {
      id: 3,
      name: 'Michael Crichton',
      age: 42
    },
  },
  {
    title: 'A Book',
    author: {
      id: 4,
      name: 'A pet named steve',
      age: 42
    },
  },
  {
    title: 'Jurassic Park',
    author: {
      id: 5,
      name: 'Michael Crichton',
      age: 42
    },
  },
];

const authors = [
  {
    name: 'J.K. Rowling',
    age: 42,
    id: 2
  },
  {
    name: 'Michael Crichton',
    age: 42,
    id: 3
  },
  {
    name: 'A pet named steve',
    age: 42,
    id: 4
  },
  {
    name: 'Michael Crichton',
    age: 42,
    id: 5
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: Author
  }
  
  type Author {
    id: Int,
    name: String
    age: Int
    books: [Book]
  }
  
  type Movie {
    title: String
  }
  
  type Person {
    name: String
    age: Int
  }
  
  type Country {
    name: String
  }
  
  type EmploymentOpportunity {
     name: String
     _id: Int
     stabilityId: String # The suggestion id
     description: String
     imageUrl: String
     type: String
  }
  
  type StabilityOption {
     name: String
     _id: Int
     stabilityId: String # The suggestion id
     type: String
     description: String
     imageUrl: String
  }

  type Query {
    author: Author
    people: [Person]
    
    #ID in this case is the thing that we will use to build suggestions to customize the user experience 
    countryToId(country: String): String
    
    employmentOpportunitiesForId(id: Int): [EmploymentOpportunity]
    skillOpportunitiesForId(id: Int): [EmploymentOpportunity]
    healthOpportunitiesForId(id: Int): [EmploymentOpportunity]
    communityOpportunitiesForId(id: Int): [EmploymentOpportunity]
    stabilityOptionsForId(id: Int): [StabilityOption]
    countriesThatStartWith(prefix: String): [Country]
    movie(id: Int): Movie
    authenticationError: String
    getAuthor(id: Int): Author
  }
  
`;

const saltedMd5 = require('salted-md5');
const salt = process.env.SO_SALTY || 'All these flavors, and you chose to be salty';

const mocks = {
  Query: () => ({
    people: () => new MockList([0, 12]),
    employmentOpportunitiesForId: () => new MockList([0, 24]),
    skillOpportunitiesForId: () => new MockList([0, 24]),
    healthOpportunitiesForId: () => new MockList([0, 24]),
    communityOpportunitiesForId: () => new MockList([0, 24]),
    stabilityOptionsForId: () => new MockList([4, 4]),
    countryToId: ()=> saltedMd5(`${Math.ceil(Math.random() * 100)}`, salt)
  }),
  String: () => `I am a mocked data: ${Math.ceil(100 * Math.random())}`,
};

const resolvers = {
  Query: {
    author(root, args, context, info) {
      return find(authors, {id: args.id});
    },
    movie: async (_source, { id }, { dataSources }) => {
      return dataSources.moviesAPI.getMovie(id);
    },
    countriesThatStartWith(root, {prefix}, context, info){
      const prefixLowerCase = prefix.toLowerCase();
      return countryInformation.filter(country => country.name.toLowerCase().startsWith(prefixLowerCase))
    },
    // employmentOpportunitiesForId(root, {id}, context, info){
    //   const prefixLowerCase = id.toLowerCase();
    //   return countryInformation.filter(country => country.name.toLowerCase().startsWith(prefixLowerCase))
    // },
    authenticationError: (parent, args, context) => {
      throw new AuthenticationError('must authenticate');
    },
    getAuthor(root, args, context, info) {
      return find(authors, {id: args.id})
    }
  },
  Author: {
    books(root, args, context, info) {
      return books.filter(book => book.author.id === root.id)
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    moviesAPI: new MoviesAPI(),
    employmentAPI: new EmploymentAPI(),
  }),
  mocks,
  mockEntireSchema: false,

});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});

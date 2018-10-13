const {ApolloServer, gql, MockList,AuthenticationError} = require('apollo-server');
const {find, filter} = require('lodash');

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
  
  type Person {
    name: String
    age: Int
  }

  type Query {
    author: Author
    people: [Person]
    readError: String
    authenticationError: String
    getAuthor(id: Int): Author
  }
  
`;

const mocks = {
  Query: () =>({
    people: () => new MockList([0, 12]),
  }),
  String: () => `I am a mock: ${Math.ceil(100 *Math.random())}`,
};

const resolvers = {
  Query: {
    author(root, args, context, info) {
      return find(authors, {id: args.id});
    },
    readError: (parent, args, context) => {
      fs.readFileSync('/does/not/exist');
    },
    authenticationError: (parent, args, context) => {
      throw new AuthenticationError('must authenticate');
    },
    getAuthor(root, args, context, info){
      return find(authors, {id: args.id})
    }
  },
  Author: {
    books(root, args, context, info) {
      return books.filter(book=> book.author.id === root.id)
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({typeDefs, resolvers, mocks, mockEntireSchema: false});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});

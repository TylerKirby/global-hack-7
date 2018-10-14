const {ApolloServer, gql, MockList, AuthenticationError} = require('apollo-server');
const {find, filter} = require('lodash');
const {MoviesAPI} = require('./MoviesAPI');
const {EmploymentAPI} = require('./EmploymentAPI');
const {InstabiltiesAPI} = require('./InstabiltiesAPI');
const fs = require('fs');
const path = require('path');
const CryptoJS = require("crypto-js");

const cipherString = '4a4fpfz5GqeRQbbRcC5ZQq@sUBPWVGTe';
const encryptCountry =
    country => CryptoJS.AES.encrypt(country, cipherString).toString()

const decryptCountry =
    stabilityId => {
      var bytes = CryptoJS.AES.decrypt(stabilityId.toString(), cipherString);
      return bytes.toString(CryptoJS.enc.Utf8);
    };

const countryInformation = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/randomuser/countries.json'), 'utf8'));

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type Country {
    name: String,
    flag: String,
  }
  
  type EmploymentOpportunity {
     name: String
     _id: Int
     stabilityId: String # The suggestion id
     description: String
     imageUrl: String
     type: String
  }
  
  type EmploymentOpportunityDetails {
     name: String
     _id: Int
     stabilityId: String # The suggestion id
     description: String
     imageUrl: String
     longText: String
     phoneNumber: String
     address: String
     website: String
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
  
  type Skill {
    id: String!
    name: String
    proficiency: String
  }
  
  type TheUnstable {
     id: String!
     stabilityId: String
     firstName: String
     lastName: String
     phoneNumber: String
     email: String
     ethnicity: String
     country: String
     skills: [Skill]
  }
  
  input SkillInput {
    name: String
    proficiency: String
  }
  input SkillUpdateInput {
    id: String!
    name: String
    proficiency: String
  }
  
  input TheUnstableInput {
     firstName: String
     lastName: String
     phoneNumber: String
     email: String
     ethnicity: String
     country: String
     skills: [SkillInput]
  }
  
  input TheUnstableUpdateInput {
     id: String!
     firstName: String
     lastName: String
     phoneNumber: String
     email: String
     ethnicity: String
     country: String
     skills: [SkillInput]
  }
  
  type Mutation {
    #todo should make an actual type
    addAnUnstable(anUnstable: TheUnstableInput!): TheUnstable!
    updateAnUnstable(anUnstable: TheUnstableUpdateInput!): TheUnstable!
    deleteAnUnstable(anUnstable: TheUnstableUpdateInput!): TheUnstable!
    contactAnUnstable(unstableId: String): String
  }

  type Query { 
    #TODO: THIS NEEDS AUTHENTICATION
    allInstabilties: [TheUnstable]
    
    #ID in this case is the thing that we will use to build suggestions to customize the user experience 
    countryToId(country: String): String
    idToCountry(id: String): String
    
    employmentOpportunitiesForId(id: String): [EmploymentOpportunity]
    employmentOpportunityDetails(id: Int): EmploymentOpportunityDetails
    skillOpportunitiesForId(id: String): [EmploymentOpportunity]
    skillOpportunityDetails(id: Int): EmploymentOpportunityDetails
    healthOpportunitiesForId(id: String): [EmploymentOpportunity]
    healthOpportunityDetails(id: Int): EmploymentOpportunityDetails
    communityOpportunitiesForId(id: String): [EmploymentOpportunity]
    communityOpportunityDetails(id: Int): EmploymentOpportunityDetails
    stabilityOptionsForId(id: Int): [StabilityOption]
    countriesThatStartWith(prefix: String): [Country]
  }
`;

const mocks = {
  Query: () => ({
    skillOpportunitiesForId: () => new MockList([0, 24]),
    healthOpportunitiesForId: () => new MockList([0, 24]),
    communityOpportunitiesForId: () => new MockList([0, 24]),
    employmentOpportunityDetails: () => ({}),
    skillOpportunityDetails: () => ({}),
    healthOpportunityDetails: () => ({}),
    communityOpportunityDetails: () => ({}),
    stabilityOptionsForId: () => new MockList([4, 4]),
  }),
  String: () => `I am a mocked data: ${Math.ceil(100 * Math.random())}`,
};

const resolvers = {
  Mutation: {
    addAnUnstable: (_, {anUnstable}, {dataSources}) => {
      return dataSources.instabiltyAPI.createInstability(anUnstable).then(instabilty => {
        instabilty.id = instabilty._id;
        return instabilty;
      })
    },
    updateAnUnstable: (_, {anUnstable}) => anUnstable,
    deleteAnUnstable: (_, {anUnstable}) => anUnstable,
    contactAnUnstable: (_, {unstableId}) => unstableId,
  },
  Query: {
    countriesThatStartWith(root, {prefix}, context, info) {
      const prefixLowerCase = prefix.toLowerCase();
      return countryInformation.filter(country => country.name.toLowerCase().startsWith(prefixLowerCase))
    },
    employmentOpportunitiesForId: (_, {id}, {dataSources}) =>
        dataSources.employmentAPI.getEmploymentOpportuntitiesForId(decryptCountry(id))
            .then(res =>
                res.map(jobHit => jobHit._source)),
    countryToId(_, {country}) {
      return encryptCountry(country)
    },
    idToCountry(_, {id}) {
      return decryptCountry(id);
    },
    allInstabilties(root, args, {dataSources}) {
      return dataSources.instabiltyAPI.getInstabilites().then(instabilites => {
        instabilites.forEach(instabilty => {
          instabilty.id = instabilty._id;
          instabilty.stabilityId = encryptCountry(instabilty.country);
        });
        return instabilites;
      })
    },
    // employmentOpportunitiesForId(root, {id}, context, info){
    //   const prefixLowerCase = id.toLowerCase();
    //   return countryInformation.filter(country => country.name.toLowerCase().startsWith(prefixLowerCase))
    // },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    employmentAPI: new EmploymentAPI(),
    instabiltyAPI: new InstabiltiesAPI(),
  }),
  mocks,
  mockEntireSchema: false,

});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});

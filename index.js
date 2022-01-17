const { ApolloServer } = require('apollo-server');

const gql = require('graphql-tag');

const mongoose = require('mongoose');

const {MONGODB} = require('./config');

const typeDefs= gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi:()=> 'Hello World!!!'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
  .then(() => {
      console.log('Database connected successfully');
      return server.listen({port: 5000})
  })
  .then((res) => {
      console.log(`Server running at ${res.url}`)
  })
  .catch(err => {
    console.error(err)
  })

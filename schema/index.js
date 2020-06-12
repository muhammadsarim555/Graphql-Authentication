const graphql = require("graphql");
const mongoose = require("mongoose");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = graphql;

const { USER_SIGNUP, USER_SIGN_IN, GET_USER } = require("./user");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    GET_USER,
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    USER_SIGNUP,
    USER_SIGN_IN,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
} = graphql;

const bcrypt = require("bcryptjs");

const User = require("./../models/user");

var salt = bcrypt.genSaltSync(10);

let USER_TYPE = new GraphQLObjectType({
  name: "USER_TYPE",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  }),
});

let USER_SIGNUP = {
  type: USER_TYPE,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    let password = bcrypt.hashSync(args.password, salt);

    let user = new User({
      email: args.email,
      password: password.toString(),
    });

    return user.save();
  },
};

let USER_SIGN_IN = {
  type: USER_TYPE,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent, args) {
    return User.findOne({ email: args.email }).then(async (data) => {
      if (!data) {
        throw new Error("Invalid Credentials");
      }
      const valid = await bcrypt.compare(args.password, data.password);
      if (!valid) {
        throw new Error("Invalid Credentials");
      }
      // if (!data.verified) {
      //   throw new Error("Email is not Verified");
      // }
      return data;
    });
  },
};

// let EDIT_USER = {
//   type: USER_TYPE,
//   args: {
//     _id: { type: new GraphQLNonNull(GraphQLID) },
//     item: { type: GraphQLString },
//   },
//   resolve: async (parent, args) => {
//     const update_item = await Item.findOne({ _id: args._id });

//     if (args.item) {
//       update_item.item = args.item;
//     }

//     return update_item.save();
//   },
// };

// let DELETE_ITEM = {
//   type: TODOITEM_TYPE,
//   args: {
//     _id: { type: new GraphQLNonNull(GraphQLID) },
//   },
//   resolve: (parent, args) => {
//     return Item.remove({ _id: args._id });
//   },
// };

let GET_USER = {
  type: new GraphQLList(USER_TYPE),
  resolve(parent, args) {
    return User.find();
  },
};

module.exports = {
  USER_SIGNUP,
  USER_SIGN_IN,
  GET_USER,
  //   GET_ITEM,
  //   EDIT_USER,
  //   DELETE_ITEM,
};

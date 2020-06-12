const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const graphqlHTTP = require("express-graphql");
const MyGraphQLSchema = require("./schema");

mongoose.connect("mongodb://sarima:sarim123@ds113063.mlab.com:13063/mytodo");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(5000, () => {
  console.log(`App is Listening on 5000`);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  })
);

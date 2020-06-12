const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  email: {
    required: true,
    type: String,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    unique: true,
  },
  password: { required: true, type: String },
});

module.exports = mongoose.model("Users", usersSchema);

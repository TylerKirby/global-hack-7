const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//This is what I am calling the immigrant at the moment.
const TheUnstableSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  ethnicity: String,
  country: String,
  skills: [{}]
});

module.exports = mongoose.model('TheUnstable', TheUnstableSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//This is what I am calling the immigrant at the moment.
const TheUnstableSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  ethnicity: String,
  country: String,
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
});

module.exports = mongoose.model('TheUnstable', TheUnstableSchema);

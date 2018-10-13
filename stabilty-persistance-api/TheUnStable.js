const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//This is what I am calling the immigrant at the moment.
const TheUnstableSchema = new Schema({
  _id: Number,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  name: String,
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
});

module.exports = mongoose.model('TheUnstable', TheUnstableSchema);

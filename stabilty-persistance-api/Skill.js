const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//This is what I am calling the immigrant at the moment.
const SkillSchema = new Schema({
  _id: Number,
  _owner: { type: Number, ref: 'TheUnStable' },
  name: String,
  proficiency: String,
});

module.exports = mongoose.model('Skill', SkillSchema);

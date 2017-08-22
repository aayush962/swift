const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  pm: {type: Schema.Types.ObjectId, ref: 'User'},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  due_date: Date,
  company: {type: Schema.Types.ObjectId, ref: 'Company'}
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

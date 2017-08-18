const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: String,
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  assigned_to: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

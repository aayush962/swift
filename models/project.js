const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: String
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

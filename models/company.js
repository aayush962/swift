const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String,
  size: String,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;

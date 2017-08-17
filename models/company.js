const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;

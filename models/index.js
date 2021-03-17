const dbConfig = require('../config/db.config.js')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

db.categories = require('./category.model.js')(mongoose)
db.persons = require('./person.model.js')(mongoose)

module.exports = db
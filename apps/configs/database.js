const config = require('./config')

const pgp = require('pg-promise')()

const db = pgp(config.database.url)

module.exports = db

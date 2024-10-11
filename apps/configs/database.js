import config from './config.js'
import pgpromise from 'pg-promise'

const pgp = pgpromise()
const db = pgp(config.database.url)

export default db

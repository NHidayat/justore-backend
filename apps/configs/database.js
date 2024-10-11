import config from './config.js'
import pgpromise from 'pg-promise'

const pgp = pgpromise()
const db = pgp(config.database.url)

const types = pgp.pg.types
// OID untuk INTEGER dan BIGINT di PostgreSQL
const INTEGER_OID = 23
const BIGINT_OID = 20

// Override parsing untuk tipe INTEGER
types.setTypeParser(INTEGER_OID, value => {
  return parseInt(value, 10)
})

// Override parsing untuk tipe BIGINT
types.setTypeParser(BIGINT_OID, value => {
  return parseInt(value, 10)
})

export default db

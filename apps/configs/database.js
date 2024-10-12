import config from './config.js'
import pgpromise from 'pg-promise'

const pgp = pgpromise()
const db = pgp(config.database.url)

const types = pgp.pg.types
// OID untuk INTEGER dan BIGINT di PostgreSQL
const INTEGER_OID = 23
const BIGINT_OID = 20
const NUMERIC_OID = 1700

// Override parsing untuk tipe INTEGER
types.setTypeParser(INTEGER_OID, value => {
  return parseInt(value, 10)
})

// Override parsing untuk tipe BIGINT
types.setTypeParser(BIGINT_OID, value => {
  return parseInt(value, 10)
})

// Override parsing untuk tipe NUMERIC/DECIMAL
types.setTypeParser(NUMERIC_OID, value => {
  return parseFloat(value) // Mengonversi value ke Number
})

export default db

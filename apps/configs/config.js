const dotenv = require('dotenv')
dotenv.config()

const config = {

  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URL
  }

}

module.exports = config

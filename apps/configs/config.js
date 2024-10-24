import dotenv from 'dotenv'
dotenv.config()

const config = {

  port: process.env.PORT,
  nodeEnvironment: process.env.NODE_ENV,
  base_url: process.env.BASE_URL,
  uploadDir: process.env.UPLOAD_DIR,
  database: {
    url: process.env.DATABASE_URL
  }

}

export default config

import config from '../configs/config.js'
import fs from 'fs'
import path from 'path'

const upload = async (file) => {
  const filename = file.hapi.filename
  const fileNewName = 'img-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(filename)
  const filepath = path.join(config.uploadDir, fileNewName)
  await fs.promises.writeFile(filepath, file._data)

  return config.base_url + filepath
}

export default upload

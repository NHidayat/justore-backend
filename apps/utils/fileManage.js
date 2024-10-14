import config from '../configs/config.js'
import fs from 'fs'
import path from 'path'

export const upload = async (file) => {
  const filename = file.hapi.filename
  const allowedExtensions = ['.jpg', '.jpeg', '.png']
  const fileExt = path.extname(filename).toLowerCase()

  if (!allowedExtensions.includes(fileExt)) {
    throw new Error('Invalid file type. Only .jpg, .jpeg, .png files are allowed.')
  }

  const fileNewName = 'img-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(filename)
  const filepath = path.join(config.uploadDir, fileNewName)
  await fs.promises.writeFile(filepath, file._data)

  return config.base_url + filepath
}

export const deleteFile = async (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      return new Error(err)
    }
  })
}

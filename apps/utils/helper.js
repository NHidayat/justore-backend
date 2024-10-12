import dayjs from 'dayjs'
import queryString from 'query-string'

export const formatDate = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format)
}

export const generateQuery = (path = '', page, totalPage, currentQuery, direction) => {
  const newPage = direction === 'prev' ? page - 1 : page + 1

  if (newPage >= 1 && newPage <= totalPage) {
    const result = { ...currentQuery, page: newPage }
    return path + queryString.stringify(result)
  }

  return null
}

export const generateSKU = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' // Karakter yang bisa digunakan
  let sku = ''

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    sku += characters[randomIndex]
  }

  return sku
}

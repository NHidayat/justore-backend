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

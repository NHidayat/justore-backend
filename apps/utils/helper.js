import dayjs from 'dayjs'
import queryString from 'query-string'

export const formatDate = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format)
}

export const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatePage = { page: page - 1 }
    const result = { ...currentQuery, ...generatePage }
    return queryString.stringify(result)
  } else {
    return null
  }
}

export const getNextLink = (page, totalPage, currentQuery) => {
  console.log(page, totalPage, currentQuery)

  if (page < totalPage) {
    const generatePage = { page: page + 1 }
    const result = { ...currentQuery, ...generatePage }
    return queryString.stringify(result)
  } else {
    return null
  }
}

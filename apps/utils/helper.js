const dayjs = require('dayjs')
const { default: queryString } = require('query-string')

const helper = {

  formatDate: (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(date).format(format)
  },

  getPrevLink: (page, currentQuery) => {
    if (page > 1) {
      const generatePage = { page: page - 1 }
      const result = { ...currentQuery, ...generatePage }
      return queryString.stringify(result)
    } else {
      return null
    }
  },

  getNextLink: (page, totalPage, currentQuery) => {
    console.log(page, totalPage, currentQuery)

    if (page < totalPage) {
      const generatePage = { page: page + 1 }
      const result = { ...currentQuery, ...generatePage }
      return queryString.stringify(result)
    } else {
      return null
    }
  }

}

module.exports = helper

const axios = require('axios')

export default async function (req, res, next) {
  if (req.url === '/sitemap.xml') {
    try {
      const backendUrl = process.env.baseUrl
      const response = await axios.get(`${backendUrl}/sitemap.xml`, {
        responseType: 'stream',
      })
      res.setHeader('Content-Type', 'application/xml')
      response.data.pipe(res)
    } catch (error) {
      console.error('Error fetching sitemap:', error)
      res.statusCode = 500
      res.end('Error fetching sitemap')
    }
  } else {
    next()
  }
}

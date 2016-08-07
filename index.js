'use strict'

// Setup
const qs = require('querystring')
const http = require('http')
const xmlOpts = {
  async: true,
  explicitArray: false,
  ignoreAttrs: true,
  normalize: true,
  tagNameProcessors: [
    (k) => k.replace(/ID/g, 'Id'),
    (k) => `${k.charAt(0).toLowerCase()}${k.substr(1)}`
  ]
}
const Xml2js = require('xml2js')
const xml = (new Xml2js.Parser(xmlOpts)).parseString
const apiV1Host = 'www.tgtappdata.com'
const apiV2Host = 'api.target.com'

// Exports
module.exports.stores = (opts, cb) => {
  let query = qs.stringify(opts)
  let body = ''
  http.get(`http://${apiV2Host}/v2/store?${query}`, (res) => {
    res.on('data', (chunk) => body += chunk)
    res.on('end', () => xml(body, (xmlErr, xmlData) => {
      if (xmlErr) return cb(xmlErr)
      cb(null, xmlData.locations.location)
    }))
  }).on('error', (err) => cb(err))
}

module.exports.search = (opts, cb) => {
  let query = `searchTerm=${opts.query}`
  let body = ''
  let reqOpts = {
    hostname: apiV1Host,
    port: 80,
    path: `/v1/products/list${opts.store ? `/${opts.store}` : ''}?${query}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `redsky-api-key=${opts.key}`
    }
  }
  let req = http.request(reqOpts, (res) => {
    res.on('data', (chunk) => body += chunk)
    res.on('end', () => cb(null, JSON.parse(body)))
  })
  req.on('error', (err) => cb(err))
  req.end()
}

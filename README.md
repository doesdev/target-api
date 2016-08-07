# target-api   [![npm version](https://badge.fury.io/js/target-api.svg)](http://badge.fury.io/js/target-api)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

An inelegant helper for checking brickseek for Walmart inventory based on a query to Walmart API.

### Requires Target API key(s) [`stores` uses API v2, `search` uses API v1]
I have no idea where you get those from as they don't appear to have open API access.

That being said the v2 API is used by the website's store locator and v1 is used by the mobile app.

## install
`npm i target-api`

## programmatic usage

Provide API key (required)
```javascript
const targetApi = require('target-api')

// get array of stores
const storesOpts = {key: 'someV2ApiKey', nearby: 33803, range: 50, limit: 50}
targetApi.stores(storesOpts, console.log)

// get product search results
const searchOpts = {key: 'someV1ApiKey', store: 1299, query: '4k tv'}
targetApi.search(searchOpts, console.log)
```

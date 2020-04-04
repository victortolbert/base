var path = require('path')
var express = require('express')
var serveStatic = require('serve-static')
var app = express()
var jsonServer = require('json-server')
var history = require('connect-history-api-fallback')

app.use(
  history({
    // verbose: true
  }),
)

app.use(serveStatic(path.join(__dirname, 'dist')))

app.use('/api', jsonServer.router(path.join(__dirname, 'data', 'emails.json')))

var port = process.env.PORT || 5000

app.listen(port)
console.log('server started ' + port)

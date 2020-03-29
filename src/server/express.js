"use strict"

const mountExpressRoutingSystem = function( app ){
   app.server.express = require('express')()
   app.server.express.get('/', (req, res) => res.send('hello wolrd')) 
}

module.exports = {
   mountExpressRoutingSystem
}

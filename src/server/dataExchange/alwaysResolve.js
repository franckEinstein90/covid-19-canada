/*******************************************************************************
 * FranckEinstein90 
 * ****************************************************************************/
"use strict"

/******************************************************************************/
const request = require('request')
const validator = require('validator')
/******************************************************************************/

const alwaysResolve = function (apiCall, options = {
        good,
        bad, 
        headers
    }) {

            let _callOptions = { }
            let bad     = (typeof options.bad   === 'function')? options.bad    : x => options.bad 
            let good    = (typeof options.good  === 'function')? options.good   : x => options.good

            _callOptions.url        = validator.isURL( apiCall ) ? apiCall : null
            _callOptions.headers    = 'headers' in options       ? options.headers : null

            return new Promise( resolve  => {

               if(_callOptions.url === null) return resolve( bad ('bad url'))

               request(_callOptions, (err, response, body) => {
                    if (err) {
                        return resolve( bad( err, response, body ) )
                   } else if ( response && 'statusCode' in response && response.statusCode === 200 ){
                        return resolve( good( body , response ))
                    } else {
                        return resolve( bad ( err, response, body))
                    }
               })
            })
        }


const mountDataExchangeModule = function( app ){
   return new Promise(resolve => {
      app.externalData = {
         get : (apiCall, options) => alwaysResolve(apiCall, options)
      }
      return resolve(app)
   })
}

module.exports= {
   mountDataExchangeModule
}
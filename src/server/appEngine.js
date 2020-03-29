/*****************************************************************************/

/*****************************************************************************/
"use strict"
/*****************************************************************************/
const _ = require('underscore')
/*****************************************************************************/
let provinces = new Map()



const _updateFromDB = function( app ){
    return app.localDatabase.getAllRecords({ table:'cases' })
    .then( results => {
        results.forEach( record => {
            let province = record.province
            if(!provinces.has(province)) provinces.set( province, [])
                provinces.get(province).push(record.health_region)
            })
            provinces.forEach((healthServices, province)=>{
                let uniqSet = _.uniq(healthServices)
            })
      })
}

const _runApp = ( app ) =>{
    app.engine.say(`${app.metadata.appName} now running`)
    _updateFromDB( app )
    .then( _ => {
       app.server.express.listen(app.data.defaultPort, ()=>console.log(`alive`))
    }) 
}

const initAppEngine = function( app ){
    return new Promise(resolve => {
	    app.engine = {}
        app.engine.say = msg => console.log(msg)

        app.data = {
            defaultPort : 3000
        }

        app.server = { }
        require('@server/express').mountExpressRoutingSystem( app )
        app.run = _ => _runApp( app )
        return resolve( app )
    })
}

module.exports = {
	initAppEngine
}


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
                debugger
            })
      })
}


const initAppEngine = function(app){

	app.engine = {}
	app.engine.say = msg => console.log(msg)

    app.run = () =>{
        app.engine.say(`${app.metadata.appName} now running`)
        _updateFromDB( app )
        .then( _ => {
            debugger
        }) 
   }
   return app
}

module.exports = {
	initAppEngine
}


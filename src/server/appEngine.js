/*****************************************************************************/

/*****************************************************************************/
"use strict"
/*****************************************************************************/


const initAppEngine = function(app){
	app.engine = {}
	app.engine.say = msg => console.log(msg)

   app.run = () =>{
      app.engine.say(`${app.name} now running`)
   }
        
	return app
}

module.exports = {
	initAppEngine
}


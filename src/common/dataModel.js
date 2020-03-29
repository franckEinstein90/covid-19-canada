
const dataModel = function( app ){

   let property = 'property'
   let primaryKey = 'primary'

   return {
      cases : {
         case_id     : primaryKey, 
         date_report : property, 
         case_source : property
      }
   }
}

const mountDataModel = app => {
   return new Promise( resolve => {
      app.dataModel = dataModel( app )
      return resolve( app )
   })
}

module.exports = {
   mountDataModel
}
"use strict"

let newDataSource = _ => {
   return {
      get   : null,
      delete: null,
      new   : null,
      update: null,
      find  : null
   }
}

//adds a dataStore interface to the app
const newDataStore = function( app, dataInterface){
   debugger
}
module.exports = {
   newDataStore
}
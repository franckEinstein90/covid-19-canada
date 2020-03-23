/*******************************************************************************
 *  FranckEinstein90
 *  CovidCrisis2020
 *
 *  ui/main.js: entry point for client ui side
 ******************************************************************************/
"use strict"
 /****************************************************************************/

const sections = [
    window, 
    '#viewPort', 
    '#visualCanvas'
]

const uiSetup = function( app ){
    let createTrigger = (htmlID, action) => {
        $(`#${htmlID}`).click(action)
    }
    app.ui.addFeature({label: 'createTrigger', method: createTrigger})
}

const addUiComponent = function( app ){
    app.addComponent({label: 'ui'})
    uiSetup( app )  
    require('./appFrame').addAppFrameFeature( app )
    require('./dataTables').addDataTableFeature( app )
    return app
}

module.exports = {
   addUiComponent 
}

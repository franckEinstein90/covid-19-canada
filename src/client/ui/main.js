/******************************************************************************
 *
 *
 * ***************************************************************************/
"use strict"

 /****************************************************************************/

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
}

module.exports = {
   addUiComponent 
}
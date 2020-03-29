/*******************************************************************************
 *  FranckEinstein90
 *  CovidCrisis2020
 *
 *  main.js: entry point for client side
 ******************************************************************************/
"use strict"
/******************************************************************************/

/******************************************************************************/


$(function() {
    
    let app = { }
    require('../common/features').addFeatureSystem( app )
    app.data = {}
    require('../common/cases').addCaseObjectDef( app         )
    require('../common/locations').addLocationComponent( app )
    require('./ui/main').addUiComponent( app                 )
    require('./dataFetch/main').gsheetsAPI( app              )
    .then( app => {
        require('./ui/cases/tabular').addCaseTabularView( app )
    })
}) 

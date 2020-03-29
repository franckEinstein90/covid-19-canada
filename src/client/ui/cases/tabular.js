/*******************************************************************************
 *  FranckEinstein90
 *  CovidCrisis2020
 *
 *  main.js: entry point for client side
 ******************************************************************************/
"use strict"
/******************************************************************************/

/******************************************************************************/

const caseTableTemplate = function( htmlID ){

    return [
        `<table id="${htmlID}" class="display" style="color:black">`,
        `</table>`
    ].join('')
}


let colDefs = [
  {
    id: 'id', 
    label:'Case Number'
  },
  {
    id: 'dateReported', 
    label:'Date Reported', 
    render: ( data, type, row ) => data.format( "D-MM-YYYY")
  },
  {
    id: 'gender', 
    label:'Gender'
  }, 
  {
    id: 'province',
    label: 'Province'
  }, 
  {
    id: 'age', 
    label: 'Age'
  }  
]

const createTable = function( app, htmlID )  {
    
    let tableID = app.ui.dataTables.newTable({
        htmlID, 
        fields: colDefs,
        options: {
            data : app.data.cases,
            columns : colDefs.map( colDef => {
                return {
                   data: colDef.id, 
                   render: colDef.render 
                }
            })
        }
    })
    return tableID
}




const addCaseTabularView = function( app ){

    let htmlID = 'caseTable'
    $('#rightOrBottom').append( caseTableTemplate( htmlID) ) 
    let tableID = createTable(app, htmlID)
    return app

}

module.exports = {
    addCaseTabularView
}

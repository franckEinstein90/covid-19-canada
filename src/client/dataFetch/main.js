/*******************************************************************************
 *  FranckEinstein90
 *  CovidCrisis2020
 *
 *  main.js: entry point for client side
 ******************************************************************************/
"use strict"
/******************************************************************************/
const getGoogleSheet = function( sheetsUrl ){
    
    let proxUrl = 'https://cors-anywhere.herokuapp.com/'

    return new Promise((resolve, reject) => {
        $.ajax(proxUrl + sheetsUrl, {
            success: function(data, status, xhr){
                let parsed = data.split("\n")
                return resolve({
                    fieldNames  : parsed[0].split(','),
                    records     : parsed.slice(1)
                })
            },
            error: function(jqXhr, textStatus, errorMessage){
                return reject(errorMessage) 
            }
        })
    })
}

const csvRecordToObject = (caseData, fieldNames)  => {
    let data = caseData.split(',')
    let record = {}
    data.forEach( (info,idx) => {
        try {
            record[fieldNames[idx]] = info
        } catch {
            debugger
        }
    })
    return record
}

const gsheetsAPI = function( app ) {

    let sheetID = '2PACX-1vQEsTIwsxHSbVnAoID8cNgSuDJZk6xG_XyN58qEgiWIx_SA2Lg-KYiqApmT9BImYKqi-z_TlrV8hNO0'
    let sheetsUrl = `https://docs.google.com/spreadsheets/d/e/${sheetID}/pub?gid=0&single=true&output=csv`

    return getGoogleSheet( sheetsUrl )
    .then( data => data.records.map( record => csvRecordToObject(record, data.fieldNames)))
    .then( caseRecords => caseRecords.map( app.data.newCase ))
    .then( cases => {
        app.data.cases = cases 
        return app 
    })
}

module.exports = {
    gsheetsAPI
}

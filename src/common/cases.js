
/*****************************************************************************/
"use strict"
/*****************************************************************************/
const moment = require('moment')



const Case = function( caseData ){

    this.id             = caseData.case_id
    this.dateReported   = moment(caseData.date_report, "DD-MM-YYYY")
    this.gender         = caseData.sex
    this.province       = caseData.province
    this.region         = caseData.health_region
    this.age            = caseData.age

    this.location       = {
        region     : caseData.health_region, 
        province   : caseData.province, 
        country    : caseData.country
    } 
}


const addCaseObjectDef = function( app ){
    app.data.newCase = x => new Case( x )
}

module.exports = {
    addCaseObjectDef
}

"use strict"

let fetchData = function( url, proxyUrl ){
  fetch(proxyUrl + url)
  .then(result => {
    debugger
  })
 .catch(e => {
    debugger
    return e;
  });
}
const gsheetsAPI = function( app ) {

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    let sheetID = '2PACX-1vTFY8vXXGJEoT_3l_8tsM1MvwTPZJ75FNz9MtMEryJ38UjK2Osh9R4IsxjhV2cgwf7Yuw_u_C_Y544T'
    let sheetsUrl = [
          'https://docs.google.com/spreadsheets/d/', 
          `${sheetID}/`
      ].join('')
    fetchData( sheetsUrl, proxyUrl )
}

module.exports = {
    gsheetsAPI
}
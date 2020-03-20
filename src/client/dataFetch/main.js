"use strict"


const gsheetsAPI = function( app ) {
    debugger
    try {
      const sheetsUrl = [
          'https://docs.google.com/spreadsheets/d/', 
          '1D6okqtBS3S2NRC7GFVHzaZ67DuTw7LX49-fqSLwJyeo/'
      ].join('')

      return fetch(sheetsUrl)
      .then(response => {
        if(!response.ok) {
          throw new Error('Error fetching sheet');
        }

        return response.text();
      })
      .then(resultText => {
        const formattedText = resultText.replace('gdata.io.handleScriptLoaded(','').slice(0, -2);
        return JSON.parse(formattedText);
      });

    } catch(err) {
      console.log(`gsheetsAPI error: ${err}`);

      return {};
    }
}

module.exports = {
    gsheetsAPI
}
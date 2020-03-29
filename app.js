
/*****************************************************************************/
"use strict"
/*****************************************************************************/
require('module-alias/register')
/*****************************************************************************/
const app = {
    metadata : {
        appName       : 'canadaCovidTrack',
        root          : __dirname, 
        localDatabase : 'data.db'
    } 
}
/*****************************************************************************/
require('@common/features').mountFeatureSystem(  app                         )
.then( require('@common/dataModel').mountDataModel                           )
.then( require('@server/appEngine').initAppEngine                            )
.then( require('@server/db').addLocalDatabaseFeature                         )
.then (app => {
    app.features.add({
        label: "localCaseInfo",
        model: app.dataModel.cases, 
        featureType: 'dataStore', 
        interface: {
            getRecord : pk => pk, 
            addRecord: a => a, 
            deleteRecord: a => a
        }
    })
    return app
})
.then( require('@server/dataExchange/alwaysResolve').mountDataExchangeModule )
.then( app => app.run() )





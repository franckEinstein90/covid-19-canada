
/*****************************************************************************/
"use strict"
/*****************************************************************************/
require('module-alias/register')
/*****************************************************************************/
const app = {
    metadata : {
        appName       : 'CanadaCovidTrack',
        root          : __dirname, 
        localDatabase : 'data.db'
    } 
}
/*****************************************************************************/
require('@common/features').addFeatureSystem( app )
require('@server/appEngine').initAppEngine( app )
require('@server/db').addLocalDatabaseFeature( app )
.then( app => app.run() )





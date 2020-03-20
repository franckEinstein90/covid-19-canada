(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
/*******************************************************************************
 *  FranckEinstein90
 *
 *  main.js: entry point 
 ******************************************************************************/
"use strict"
/******************************************************************************/

/******************************************************************************/


$(function() {
    
    let app = { }
    require('../common/features').addFeatureSystem( app )
    require('./ui/main').addUiComponent( app )
    require('./dataFetch/main').gsheetsAPI( app )

})
},{"../common/features":5,"./dataFetch/main":1,"./ui/main":4}],3:[function(require,module,exports){
/******************************************************************************
 * 20200000000000000000000000000000
 *
 * ui frame for window sizing and resizing 
 *
 * ***************************************************************************/
"use strict"
 /****************************************************************************/
const deviceRatios = [
    {id: 1, ratio: '4x3'}, 
    {id: 2, ratio: '16x9'}, 
    {id: 3, ratio: '3x2'}
]
    

const _screenDimensions = _ => {
    let height =  $( window ).height()
    let width = $( window ).width()
    let orientation = height > width ? 'portrait' : 'landscape' 
     return {
        height,
        width,
        orientation
    }
}

const _setHeight = (element, height) => {
    element.height(height)
}

const _configureLayout = ( app ) => {

    let screen           = _screenDimensions()
    let visualElements   = app.ui.visualElements
    let contentViewport  = {
        top     : 0, 
        height  : screen.height, 
        width   : screen.width
    }
    
    if( $('#topNav').length && visualElements.topNav ){  
        let topNav = visualElements.topNav( screen )
        contentViewport.top     += topNav.height
        contentViewport.height  -= topNav.height
        $('#topNav').css( topNav )
    }

    if( $('#bottomNav').length && visualElements.bottomNav ){
        let bottomNav = visualElements.bottomNav( screen )
        contentViewport.height -= bottomNav.height
        $('#bottomNav').css( bottomNav )
    }
    
    if($('#content').length) $('#content').css( contentViewport )
    if($('#leftTop').length){
        let leftTopCss = {
            top  : contentViewport.top, 
            height : contentViewport.height, 
            width  : contentViewport.width / 2 
        } 
        $('#leftTop').css( leftTopCss )
    }
}

let bottomNavCss = screen => {
    let height = screen.orientation === 'portrait' ? 55 : 30
    return {
        top: screen.height - height, 
        left: 0, 
        height 
    }
}

let topNavCss = screen => {
    return {
        top: 0,  
        left: 0, 
        height: 55 
    }
}


const uiFrame = function( app ){

    app.ui.visualElements = {
        topNav      : topNavCss, 
        bottomNav   : bottomNavCss, 
    }   

    _configureLayout( app )
    $(window).resize(()=> {
        _configureLayout( app )
    })

}

const addAppFrameFeature = function( app ){
    uiFrame( app )
    return app
}


module.exports = {
    addAppFrameFeature
}
},{}],4:[function(require,module,exports){
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
},{"./appFrame":3}],5:[function(require,module,exports){
/*****************************************************************************/
"use strict"
/*****************************************************************************/

class Feature {

    constructor( options ){
        this.label          = options.label
        this.implemented    = options.implemented || false
        this.method         = options.method || false
    }

}

function AppComponent( componentDefinition ){

    this.label = componentDefinition.label
    let _features = new Map()

    if('methods' in componentDefinition) {
        Object.keys(componentDefinition.methods).forEach(
            (key, index)=>{
                if(key === 'configure') return
                _features[key] = true
                this[key] = componentDefinition.methods[key]
            })
    }

    this.addFeature =  function(feature){
        if(!('label' in feature)) throw 'error in feature definition'
        if(_features.has(feature.label)) throw "feature already exists"
        _features.set( feature.label, feature)
        if('method' in feature) this[ feature.label ] = feature.method
    }
}

const featureSystem = function( app ){

    let _features       = new Map()
    let _components     = new Map()
    let _reqMajor       = 0
    let _requirements   = new Map()

    return {

        get list()  {
            let features = {}
            _features.forEach((value, key)=>{
                features[key] = value
            })
            return features
        },

        implements  : featureLabel => _features.has(featureLabel), 

        addRequirement  : function({
            req, 
            parentReq
        }) {
            if( parentReq === undefined || parentReq === null){
                _reqMajor += 1
                _requirements.set(  _reqMajor, req)
            }
        },

        includes: featureName => {
            if(_features.has(featureName)) return _features.get(featureName)
            return false
        },

        addComponent : function( componentInfo ){
            let newComponent = new AppComponent( componentInfo )
            _components.set(newComponent.label, newComponent)
            app[newComponent.label] = newComponent 
        }, 

        add : function( feature ){
            if(!('label' in feature)) throw 'error in feature definition'
            if(_features.has(feature.label)) throw "feature already exists"
            _features.set( feature.label, feature)
            if('method' in feature) app[ feature.label ] = feature.method
        }
    }
}

const addFeatureSystem = function( app ){

    let features = featureSystem( app )
    Object.defineProperty( app, 'features', {get: () => features.list})
    app.addRequirement = features.addRequirement        
    app.addComponent   = features.addComponent
    app.Feature = Feature
    app.addFeature = features.add
    app.implements = features.implements
    return app
}

module.exports = {
    addFeatureSystem
}
},{}]},{},[2]);

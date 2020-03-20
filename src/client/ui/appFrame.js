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
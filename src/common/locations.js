"use strict"

let getLocation = function(locationDescriptor){
    let apiKey = 'AIzaSyCSpi5lWUOO56R9DzPY_C1Lrq0OpW-TUgI'
    let url = [
        `https://maps.googleapis.com/maps/api/geocode/json?address=`, 
        locationDescriptor, 
        `&key=${apiKey}`
    ].join('')

    return new Promise((resolve, reject) => {
        $.ajax(url , {
            success: function(data, status, xhr){
                debugger
                return resolve(data)
            },
            error: function(jqXhr, textStatus, errorMessage){
                debugger
                return reject(err)
            }
        })
    })
}
    


const City = function(options){
    this.coordinates = options.coordinates
}
const StateProvince = function(options){
    this.coordinates = options.coordinates

}



const canadianCities = (function(){

    let _cities = new Map()

    _cities.set('Toronto', new City({
        coordinates: "43-44-30-N 79-22-24-W"
    }))

    _cities.set('Vancouver', new City({
        coordinates: "49.2827° N, 123.1207° W"
    }))

    return {
        has : identifier => {
            if(_cities.has(identifier)) return true
            return false
        }, 
        get : identifier => {
            return _cities.get(identifier)
        } 
    }

})()




const canadianProvinces = new Map()

canadianProvinces.set('Ontario', new StateProvince({
    coordinates: "51.2538° N, 85.3232° W"
    }))

canadianProvinces.set('British Columbia', new StateProvince({
    coordinates: "53.7267° N, 127.6476° W"
    }))




const locations = (function(){

    let _countries = new Map()

    _countries.set( 'Canada', {
        recognize: location => {
            if(canadianCities.has(location.region)){
                return canadianCities.get(location.region)
            }
            if(canadianProvinces.has(location.province)){
                return canadianProvinces.get(location.province)
            }
            return getLocation(`${location.region},${location.province},+Canada`)
        }
    })   
 
    let _locations = new Map()

    return {
        recognize : ( locationInfo ) => {
            if( locationInfo.country !== undefined ){
               return _countries.get(locationInfo.country).recognize(locationInfo) 
            }
            debugger
            return null 
        }
    }

})()

const provinces  = {

    Canada  
    Alberta  
    Sask  
    Manitoba  
    {
        reg: /On/ , 
        name: 'Ontario'
    }, 
    {
        reg: /q.*c/, 
        name: 'Quebec'
    }, 
    
    'Quebec', 
    ['B.C.', 'BC', 
    P.E.I 
    Newfoundland
    Nova Scotia
}


const addLocationComponent = function( app ){
    app.locations = locations
}

module.exports = {
    addLocationComponent
} 

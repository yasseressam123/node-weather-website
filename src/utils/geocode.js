const request = require('request')
const geocode = (address , callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWFzc2VybW8xMjMiLCJhIjoiY2s0OTJxYXZxMDB2ZzNlcXhsdGYyZGF1dCJ9.Ucr5ewenBQsgpEzdC3lSLA&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to mapbox',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location, try another search.',undefined)
        }else if(body.message){
            callback('Unable to connect to mabbox, please enter address.',undefined)
         }else{
            callback(undefined,{
                latitude: body.features[0].center[1] ,
                longitude:body.features[0].center[0] ,
                location :body.features[0].place_name
            })
            
        }
    })
}
module.exports = geocode
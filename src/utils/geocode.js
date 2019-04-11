const request= require('request')

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoiZGhlZXJhamFzMDA4IiwiYSI6ImNqdTQzcmMxbjB0dXAzeWxvbWYyMXB5c2cifQ.vCGgXlseXU4IY9ukZnR9UA'
    
    request({url, json:true}, (error,{ body}) => {
        if(error){
            callback("Unable to connect to location services",undefined)
        }
        else if(body.features.length === 0){
            callback("Invalid location",undefined)
        }
        else
        {   data= {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports= geocode
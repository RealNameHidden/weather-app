const request= require('request')
const FtoC= require('fahrenheit-to-celsius')

const forecast = (latitude,longitude,callback) => {
const url='https://api.darksky.net/forecast/654335cc828250303df132e830f2c1f7/'+latitude+','+longitude
request({url, json:true}, (error,{ body }) =>{
    if(error){
        callback("error in getting weather function",undefined)
    }
    else {
    f = body.currently.temperature
    debugger
    c = FtoC(f)
    callback(undefined,"Today its "+body.currently.summary+" and currently it is "+ c.toFixed(2)+" degree celsius")
    }
});   
}
 
module.exports= forecast
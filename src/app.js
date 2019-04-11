const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const app = express()

//Set up paths
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

console.log(publicDirectory);
console.log(viewsPath);
console.log(partialsPath);




//Setup engines

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Static directory to serve
app.use(express.static(publicDirectory))

//Render pages
app.get('', (req,res)=>{

    res.render('index',{
        title: 'The weather app',
        author: 'Das'
    })
})


app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help page',
        author: 'Das'
    })
})
app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About page',
        author: 'Das'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'A address should be provided'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error:error
            })        
        }
        else{
            forecast(latitude, longitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        error:error
                    })                
                }
                else{
                    res.send({
                        location:location,
                        data:forecastData,
                        address:req.query.address
                    })
                    
                }
           })
        }
    })
    
})
//app.use(express.static(publicDirectory))
  

app.listen(3000,()=>{
    console.log("The server is up and running...")
})
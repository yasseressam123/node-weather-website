const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDictoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname ,'../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDictoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App!',
        name: 'yasser'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Indome',
        name:'yasser'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help!',
        name: 'yasser',
        mesg: 'Contact us on email'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide a address term'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        //console.log('Data',data)
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({location,
            forecast:forecastData})
        })
    })
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({error: 'You must provide a search term'})
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'yasser',
        title:'404',
        errorMessage:'Help article not found.'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        name:'yasser',
        title:'404',
        errorMessage:'Page not found.'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})

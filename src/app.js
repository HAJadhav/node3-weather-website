const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Define paths for Express
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Hrishi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Hrishi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Hrishi'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Plz provide an address' })
    }
   
    geocode(req.query.address, (error, {lat, longt, city } = {}) => {
        if(error){
            return res.send({
                error: 'Unable to find location.. Please try again'
            })
        }
   
    forecast(lat, longt, (error, op)=>{
        if(error){
            return res.send({
                error: 'Unable to find location.. Please try again' 
            })
        }

        res.send({
            forecastdata: op,
            city,
            address: req.query.address
        })
    
    })
})
   
    // res.send({
    //     forecast: 'Rainy',
    //     location: 'Boston',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Hrishi',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Hrishi',
        errorMsg: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server up & running on port 3000')
})
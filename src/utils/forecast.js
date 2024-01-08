const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=89deb86e9253acab24f7fcd968e82aec&query='+ latitude + ','+ longitude + '&units=m'

  request({ url, json: true}, (error,{body}) =>{
   if(error)
   {
    callback('Unable to connect to weather services',undefined)
   }
   else if(body.error)
   {
    callback('Unable to find location..', undefined)
   }
   else{
         
    callback('', 
               "Country:"+body.location.country +"."+ body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature+ " degrees hot.Feels like " + body.current.feelslike +" degrees only. The humidity is " +body.current.humidity +"%"
            ) 
       }
 })
}

module.exports = forecast
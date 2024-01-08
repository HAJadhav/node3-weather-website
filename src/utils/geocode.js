const request = require('request')

const geocode = (address, callback) =>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=d6bf34a17fdba275f9bce8807f1432a9&query='+ address +'&limit=1'

  request({ url, json: true}, (error,{body}) =>{
   if(error)
   {
    callback('Unable to find location services',undefined)
   }
   else if(body.data === 0)
   {
    callback('Unable to find location. Try another search', undefined)
   }
   else{
    callback('', {
        lat: body.data[0].latitude,
        longt: body.data[0].longitude,
        city: body.data[0].name
    })
   }
 })
}

module.exports = geocode
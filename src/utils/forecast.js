const request = require ('postman-request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b4187f0de794ea7b2037194975d0c67d&query=' + encodeURIComponent(address) + '&units=m'
    
    
    request({url, json: true}, (error, {body}) => {   
    //  The long format of the above is:
    // "request({url:url, json: true}, (error, response) => {"     and use "response.body" wherever we have "body" below }
      if (error) {
          callback('Unable to connect to weather services!', undefined)
      } else if ((!body.current) || (body.current.weather_descriptions.length === 0 ))  {
          callback('Unable to find location. Try another search.')
      } else {
          callback(undefined, {
              location: body.location.name + ', ' + body.location.country + ', ' + body.location.region,
              localtime: body.location.localtime,
              temperature: body.current.temperature,
              feelslike: body.current.feelslike,
              humidity: body.current.humidity,
              cloudcover: body.current.cloudcover
          })
      }
    })
  }
  
  module.exports = forecast
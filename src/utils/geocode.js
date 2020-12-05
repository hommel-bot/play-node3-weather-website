// Get the PGS coords from an address.
// Uses the API from mapbox.com
// (code below not tested)

const request = require ('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b4187f0de794ea7b2037194975d0c67d&query=' + encodeURIComponent(address) + '&units=m'
    
    request({url: url, json: true}, (error, {body}) => {
      if (error) {
          callback('Unable to connect to location services!', undefined)
        } else if ((!body) || (!body.features)) {
            callback('Invaid service data. ', body)
        } else if (body.features.length=== 0 )  {
          callback('Unable to find location. Try another search.')
      } else {
          callback(undefined, {
              latitude: body.features[0].center[0],
              longitude: body.features[0].center[1],
              location:   body.features[0].place_name
          })
      }
    })
  }
  
  module.exports = geocode
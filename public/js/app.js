console.log('Client side JS loaded')

// Example 1:
// // Fetch is only available on the client side - not available in node! It is a browser function, not a js function.
// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const searchElem = document.querySelector('input')
//const msgOne = document.querySelector('.classname') // "." to select the class
const msg1 = document.querySelector('#msg-1') // "#" to select the class
const msg2 = document.querySelector('#msg-2') // "#" to select the class

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = searchElem.value
    msg1.textContent = 'Loading for ' + location + ' ...'
    msg2.textContent = ''

    fetch('/weather?address=' + location).then( (response) => {
      response.json().then((data) => {
        if (data.error) {
            msg1.textContent = data.error
            //console.log(data.error)
        } else {
            const s = '<br>Humidity: ' + data.data.humidity + '<br>Cloudcover: ' + data.data.cloudcover + '<br>Wind speed: ' + data.data.windspeed + '<br>Measurement time: ' + data.data.localtime + '<br>' + Date().toString()
            msg1.innerHTML = 'Location searched: ' + location + '<br><img src="'+data.data.iconurl+'">'
            msg2.innerHTML = 'Location found: ' + data.data.location + '<br>Description: ' + data.data.description + '<br>Temperature: ' + data.data.temperature + '&deg;C<br>Feels like: ' + data.data.feelslike + '&deg;C' + s
            console.log(data)
        //    console.log(data.data.temperature)
        //    console.log(data.data.location)
        //    console.log(data.data.feelslike)
        }
      })
    })

})
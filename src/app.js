const path=require('path')
// Express docs: http://expressjs.com/en/5x/api.html
const express = require('express')
const hbs = require("hbs")
const { query } = require('express')
const app = express()
const geocode = require('./utils/geocode')
const weathersvc = require('./utils/forecast')

// Get the port which Heroku will provide, or use 3000 as default
const port = process.env.PORT || 3000

// Define paths for Express config
//console.log(path.join(__dirname, '../public'))
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine (hbs) and views location
app.set('view engine', 'hbs')
// The default path for express templates is "views". Change it to "templates"
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static files dir
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kobus'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kobus' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kobus',
        helpText: 'How to ..'
    })
})

app.get('/weather', (req, res) => {
/* Version 1: return static json
    const wres = {forecast: 'Clear', location: 'Home'}
    res.send(wres)
*/
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    weathersvc(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        res.send( {
            data,
            address: req.query.address 
        })
     })

     console.log(req.query)
    
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

// Handle 404: Not found errors. Must be last in the list!! "*" means anything not matched before.
app.get('/help/*', (req, res) => {
    //res.send('404 - Help article Not found!')
    res.render('404error', {
        title: 'Error 404',
        name: 'Kobus',
        errorText: 'Help article not found!'
    })
})
 
 app.get('*', (req, res) => {
    //res.send('404 - Not found!')
    res.render('404error', {
        title: 'Error 404',
        name: 'Kobus',
        errorText: 'Page not found!'
    })
 })
 
 app.listen(port, () => {
    console.log('Server started on port ' + port)
})

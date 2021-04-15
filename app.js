const express = require('express');
const { handlebars } = require('hbs');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials')
// ...

// Add the route handlers here:

app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
    .catch(error => console.log(error));
  res.render('beers', { beers })
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom();
  res.render('random-beer', { randomBeer })
})

app.listen(3001, () => console.log('🏃‍ on port 3000'));

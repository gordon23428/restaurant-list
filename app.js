const express = require('express')
const app = express()
const port = 4000
const exphbs = require('express-handlebars')
const resList = require('./restaurant.json')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('index', { rest: resList.results})
})
app.get('/shoppingCar', (req, res) => {
  res.render('shop')
})
app.get('/restaurants/:rest_id', (req, res) => {
  const restaurant = resList.results.find( rest => rest.id.toString() === req.params.rest_id)
  res.render('show', { restaurant: restaurant})
})
app.get('/search',(req, res) => {
  const keyword = req.query.keyword
  const restaurants = resList.results.filter( rest => rest.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { rest: restaurants, keyword: keyword})
})
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
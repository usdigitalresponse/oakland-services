const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);     

function getLang(req) {
  let lang = req.query.lang;
  if (!lang) {
    lang = 'en';
  }
  return lang;
}

app.get('/ping', function (_req, res) {
 return res.send('pong');
});

app.get('/', function (_req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/categories', function (req, res) {
  database('categories')
    .join('category_details', 'categories.id', 'category_details.category_id')
    .where({'category_details.lang': getLang(req)})
    .then(function(categories) {
      res.status(200).json(categories);
    });
});

app.get('/categories/:category_id/services', function (req, res) {
  const categoryId = req.params.category_id;

  database('services')
    .join('service_details', 'services.id', 'service_details.service_id')
    .join('categorizations', 'services.id', 'categorizations.service_id')
    .join('categories', 'categorizations.category_id', 'categories.id')
    .where({category_id: categoryId})
    .where({'service_details.lang': getLang(req)})
    .then(function(services) {
      res.status(200).json(services);
    });
});

app.get('/services/:service_id', function (req, res) {
  const serviceId = req.params.service_id;

  database('services')
    .join('service_details', 'services.id', 'service_details.service_id')
    .where({'service_details.lang': getLang(req)})
    .where({'services.id': serviceId})
    .first()
    .then(function(services) {
      res.status(200).json(services);
    });
});

app.get('/neighborhoods', function (req, res) {
  database('neighborhoods')
    .join('neighborhood_details', 'neighborhoods.id', 'neighborhood_details.neighborhood_id')
    .where({'neighborhood_details.lang': getLang(req)})
    .then(function(neighborhoods) {
      res.status(200).json(neighborhoods);
    });
});

app.listen(process.env.PORT || 8080);

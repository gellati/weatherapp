require('dotenv').config()
const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";
const targetCity = process.env.TARGET_CITY || "Helsinki,fi";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;

fetch(endpoint)
  .then(response => {
    response.json().then(weatherData => {
      router.get('/api/weather', (ctx, next) => {
        ctx.type = 'application/json; charset=utf-8';
        ctx.body = weatherData.weather ? weatherData.weather[0] : {};
      });
    });
  })
  .catch(error => {
  });

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);

console.log(`App listening on port ${port}`);

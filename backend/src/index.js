require('dotenv').config();
// const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

router.get('/api/weather', getWeatherData);

function getWeatherData (ctx, next) {
  const lat = ctx.query.lat;
  const lon = ctx.query.lon;
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&`;
  return fetch(endpoint)
    .then((resp) => resp.json())
    .then(function (data) {
      ctx.body = data;
    });
}

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);

console.log(`App listening on port ${port}`);

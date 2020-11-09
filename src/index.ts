import * as express from 'express';
import * as NodeCache from 'node-cache';

import { parseCities, parseCountries } from './parse';

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

const cache = new NodeCache();

app.get('/', (req, res) => {
  res.send("Welcome to the countries and cities API!")
});

app.get('/countries', async (req, res) => {
  const { cities } = req.query;
  
  const cacheKey = cities ? `countriesWithCities` : `countries`
  
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.send(cached);
  }

  const countries = await parseCountries();
  console.log('Parsed countries');
  
  if (cities) {
    for (const key of Object.keys(countries)) {
      console.log('Parsing', countries[key].name);
  
      const cities = await parseCities(countries[key].url);
      countries[key].cities = cities;
    }
  }

  cache.set(cacheKey, countries, 3600)
  return res.send(countries)
})

app.get('/countries/:countryCode', async (req, res) => {
  const { countryCode } = req.params;

  const cached = cache.get(countryCode);
  if (cached) {
    return res.send(cached);
  }

  const countries = await parseCountries();
  const country = countries.find(country => country.countryCode === countryCode.toUpperCase());

  if (!country) {
    res.statusCode = 400;
    return res.send("Couldn't find country code in UNECE database")
  }

  console.log(`Parsing ${country.name}`);
  const cities = await parseCities(country.url);

  cache.set(countryCode, cities, 3600)
  return res.send(cities)
})

app.listen(port, () => console.log(`Country city API is listening at port ${port}`))
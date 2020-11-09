import * as cheerio from 'cheerio';
import fetchHTML from './fetcher';

export interface Country {
  countryCode: string
  url: string
  name: string
  cities?: City[]
}

export interface City {
  name: string
}

export async function parseCountries(): Promise<Country[]> {
  const html = await fetchHTML("https://www.unece.org/cefact/locode/service/location");
  const $ = cheerio.load(html);
  const countries = [];

  /*
   Supringly the table doesn't use proper semantic html.

   The whole table is put into a thead including the first line 
   which is the actual table head. So we remove it.
  */
  $('#c30739 table thead tr:first-child').remove();
  
  $('#c30739 table thead tr').each(function () {
    const countryCode = $(this).find('td:first-child').text();
    const url = $(this).find('td a').attr('href');
    const name = $(this).find('td a').text();

    countries.push({ countryCode, url, name });
  });

  return countries;
}

export async function parseCities(countryUrl: string): Promise<City[]> {
  const html = await fetchHTML(countryUrl);
  const $ = cheerio.load(html);
  const cities = [];

  // remove the first 2 tables which are not needed
  $('table:first-child').remove();
  $('table:first-child').remove();

  // first row contains the header elements
  $('table tbody tr:first-child').remove();

  $('table tbody tr').each(function () {
    // third cell is the city name
    let name = $(this).find('td:nth-child(3)').text();
    name = name.substring(0, name.length - 1);
    cities.push(name);
  });

  return cities;
}
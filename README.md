# Country City API

Simple node.js microservice that provides up-to-date country and city names from [United Nations Economic Commission for Europe](https://unece.org)


## Quick start

```npm install```

```npm run start```

## Quick start with Docker

Pull latest image from registry <br />
```docker pull dylanblokhuis/country-city-api```

Start the container <br />
```docker run -d -p 3000:3000 dylanblokhuis/country-city-api```

Open [localhost:3000](http://localhost:3000) to see if it's working.

## Routes

```/countries```

<b>Response</b>
```
[
    ...
    {
        "countryCode": "NL",
        "url": "https://service.unece.org/trade/locode/nl.htm",
        "name": "Netherlands"
    },
    {
        "countryCode": "NC",
        "url": "https://service.unece.org/trade/locode/nc.htm",
        "name": "New Caledonia"
    },
    {
        "countryCode": "NZ",
        "url": "https://service.unece.org/trade/locode/nz.htm",
        "name": "New Zealand"
    },
    ...
]
```

<br/>

```/countries/:countryCode```

Example: ```/countries/NL```

<b>Response</b>
```
[
  "Aa en Hunze",
  "Aalburg",
  "Aalsmeer",
  "Aalsmeerderbrug",
  "Aalst",
  "Aalten",
  "Aan de Zuwe",
  "Aardenburg",
  "Aarlanderveen",
  "Aarle Rixtel",
  "Abbegaasterketting",
  "Abbekerk",
  "Abbenbroek",
]
```
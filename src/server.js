const http = require('http');
const url = require('url');
const {
  parseRatesToMap,
  convertCurrencyMapToCsvString,
  convertCurrencyMapToArray,
} = require('./logic');

http
  .createServer(async function (request, response) {
    const urlWithParsedQuery = url.parse(request.url, true);
    const query = urlWithParsedQuery.query;
    const pathName = urlWithParsedQuery.pathname;
    if (!query || !query?.startDate || !query?.endDate) {
      response.end(JSON.stringify({ error: 'Query params error' }));
    } else {
      const currenciesMap = await parseRatesToMap(
        query?.startDate,
        query?.endDate
      );
      if (pathName === '/map-rates') {
        response.end(JSON.stringify(Object.fromEntries(currenciesMap)));
      } else if (pathName === '/array-rates') {
        const currenciesArray = convertCurrencyMapToArray(currenciesMap);
        response.end(JSON.stringify(currenciesArray));
      } else if (pathName === '/csv-rates') {
        if (!query?.currencies) {
          response.end(JSON.stringify({ error: 'Query params error' }));
        } else {
          const currenciesCsv = convertCurrencyMapToCsvString(
            query?.currencies,
            currenciesMap
          );
          response.end(currenciesCsv);
        }
      }
    }
    response.end();
  })
  .listen(3001);

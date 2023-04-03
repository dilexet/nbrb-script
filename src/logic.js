const API_URL = 'https://www.nbrb.by/api/exrates/rates/dynamics';
const currencyIds = {
  451: 'EUR',
  456: 'RUB',
  431: 'USD',
};

function formatDate(dateString) {
  return dateString.split('T')[0];
}

async function fetchRates(currencyId, startDate, endDate) {
  try {
    const response = await fetch(
      API_URL + `/${currencyId}?startDate=${startDate}&endDate=${endDate}`
    );
    return response?.json();
  } catch (err) {
    console.log('Axios error');
    return [];
  }
}

async function parseRatesToMap(startDate, endDate) {
  if (!startDate || !endDate) {
    return null;
  }
  const currenciesMap = new Map();

  for (const currencyId of Object.keys(currencyIds)) {
    const rates = await fetchRates(currencyId, startDate, endDate);
    if (rates.length <= 0) {
      return null;
    }
    const curr = currencyIds[currencyId];
    if (currenciesMap.size <= 0) {
      for (const rate of rates) {
        const value = {
          BYN: 1.00,
          USD: 0,
          EUR: 0,
          RUB: 0,
        };
        value[curr] = rate['Cur_OfficialRate'];
        const date = formatDate(rate['Date'])
        currenciesMap.set(date, value);
      }
    } else {
      for (const rate of rates) {
        const date = formatDate(rate['Date'])
        const value = currenciesMap.get(date);
        value[curr] = rate['Cur_OfficialRate'];
        currenciesMap.set(date, value);
      }
    }
  }

  return currenciesMap;
}

// currenciesMap is a Map, where key is date (2022-01-01) and value is currencies ({USD:0,BYN:0,RUB:0,EUR:0})
// return an array of currencies and date object : [{Date: 2022-01-01, Currencies: {USD:0,BYN:0,RUB:0,EUR:0}}]
function convertCurrencyMapToArray(currenciesMap) {
  if (!currenciesMap instanceof Map) {
    return [];
  }
  return Array.from(currenciesMap, function (entry) {
    return { date: formatDate(entry[0]), currencies: entry[1] };
  });
}

// currencies are string with currencies from params: (USD,EUR,RUB,BYN)
// currenciesMap is a Map, where key is date (2022-01-01T00:00:00) and value is currencies ({USD:0,BYN:0,RUB:0,EUR:0})
// return a string in csv format
function convertCurrencyMapToCsvString(currencies, currenciesMap) {
  if (!currenciesMap instanceof Map) {
    return null;
  }
  if (!currencies) {
    return null;
  }
  const currenciesSplitArray = currencies.split(',');
  let csv = `DATE,${currencies}\n`;
  currenciesMap.forEach((value, key) => {
    csv += `${formatDate(key)},${value[currenciesSplitArray[0]]},${
      value[currenciesSplitArray[1]]
    },${value[currenciesSplitArray[2]]},${value[currenciesSplitArray[3]]}\n`;
  });

  return csv;
}

module.exports = {
  parseRatesToMap,
  convertCurrencyMapToArray,
  convertCurrencyMapToCsvString,
};

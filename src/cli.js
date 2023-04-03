const { parseRatesToMap, convertCurrencyMapToCsvString } = require('./logic');

async function writeToStdout() {
  const args = process.argv.slice(2);
  const currenciesMap = await parseRatesToMap(args[1], args[2]);
  const currenciesCsv = convertCurrencyMapToCsvString(args[0], currenciesMap);

  process.stdout.write(currenciesCsv);
}

writeToStdout().catch(console.error);

const { parseRatesToMap } = require('./logic');

exports.lambdaHandler = async (event) => {
  try {
    const query = event.queryStringParameters;
    if (!query || !query?.startDate || !query?.endDate) {
      return {
        statusCode: 400,
        body: { error: 'Query params error' },
      };
    }
    const currenciesMap = await parseRatesToMap(
      query?.startDate,
      query?.endDate
    );
    return {
      statusCode: 200,
      body: JSON.stringify(Object.fromEntries(currenciesMap)),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

## nbrb-script

# CLI examples

#### To file

```
node modules/cli.js BYN,USD,EUR,RUB 2022-01-01 2023-01-01 > rates.csv
```

#### To console

```
node modules/cli.js BYN,USD,EUR,RUB 2022-01-01 2023-01-01
```

# Api examples

```
node modules/server.js
```

### /map-rates - return currencies as Map, where key is date and values are rates
```json
{
  "2023-02-01": {
    "BYN": 1,
    "USD": 2.6744,
    "EUR": 2.8956,
    "RUB": 3.8102
  },
  "2023-02-02": {
    "BYN": 1,
    "USD": 2.678,
    "EUR": 2.9153,
    "RUB": 3.8179
  }
}
```

#### URL example:
http://localhost:3001/map-rates?startDate=2022-01-01&endDate=2023-01-01

### /array-rates - return an array of currencies and date object :

```json
[
  {
    "date": "2023-02-01",
    "currencies": {
      "BYN": 1,
      "USD": 2.6744,
      "EUR": 2.8956,
      "RUB": 3.8102
    }
  },
  {
    "date": "2023-02-02",
    "currencies": {
      "BYN": 1,
      "USD": 2.678,
      "EUR": 2.9153,
      "RUB": 3.8179
    }
  }
]
```

#### URL example:
http://localhost:3001/array-rates?startDate=2022-01-01&endDate=2023-01-01

### /csv-rates - return a string in csv format

```
DATE,USD,EUR,BYN,RUB
2023-02-01,2.6744,2.8956,1,3.8102
2023-02-02,2.678,2.9153,1,3.8179
```

#### URL example: 
http://localhost:3001/csv-rates?currencies=BYN,RUB,EUR,USD&startDate=2022-01-01&endDate=2023-01-01


# Aws lambda example

#### Download to get started:
1. AWS CLI - [download](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. AWS SAM CLI - [download](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
3. Docker - [download](https://www.docker.com/)


```
sam local start-api
```

```json
{
  "2023-02-01": {
    "BYN": 1,
    "USD": 2.6744,
    "EUR": 2.8956,
    "RUB": 3.8102
  },
  "2023-02-02": {
    "BYN": 1,
    "USD": 2.678,
    "EUR": 2.9153,
    "RUB": 3.8179
  }
}
```

#### URL example:
http://localhost:3000/lambda?startDate=2023-01-01&endDate=2023-01-15
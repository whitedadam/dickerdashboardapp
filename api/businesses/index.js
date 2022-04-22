const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const queries = require('../queries');

// Setting configuration for accessing hosted SQL DB with tedious
const config = {
  server: 'codingwpride.database.windows.net',
  options: {
    database: 'DICKERdashboard',
  },
  authentication: {
    type: 'default',
    options: {
      userName: 'Adam',
      password: 'CodingWPride2021',
    },
  },
};

const executeSql = (query, params) =>
  new Promise((resolve, reject) => {
    // Array for saving rows
    const result = [];

    // Create a connection to use later for executing query
    const connection = new Connection(config);

    // Create the request
    const request = new Request(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });

    // Put the columns into an object and store as a row
    request.on('row', (columns) => {
      let dataset = {};
      columns.forEach((column) => {
        dataset[column.metadata.colName] = column.value;
      });
      result.push(dataset);
      dataset = {};
    });

    // Once connected, reject on error or execute query
    connection.on('connect', (err) => {
      if (err) {
        reject(err);
      } else {
        connection.execSql(request);
      }
    });

    connection.connect();
  });

module.exports = async function (context, req) {
  context.log('Request to: /api/businesses');

  try {
    const data = await executeSql(queries.BUSINESSES);

    context.res = {
      body: data,
    };

    context.done();
  } catch (error) {
    context.res = {
      status: 400,
      body: error.message,
    };
  }
};

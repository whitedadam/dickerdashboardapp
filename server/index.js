const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const Connection = require('tedious').Connection;
const queries = require('./queries');

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

const connection = new Connection(config);

connection.on('connect', function (err) {
  if (err) {
    console.log('Error: ', err);
  }
  console.log('Connected to Database :)');
});

// connection.connect();

const Request = require('tedious').Request;

async function executeStatement(sql, cb) {
  // const jsonArray = [];

  const newData = [];
  const dataset = [];

  //select * from dbo.Business Test Statement
  let request = new Request(sql, function (err, rowCount, rows) {
    if (err) {
      console.log(err);
    } else {
      cb(rows, newData);
      // console.log(rowCount + " rows");
    }
  });

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      console.log(column.value);
      dataset.push({
        [column.metadata.colName]: column.value,
      });
    });
    newData.push(dataset);
  });

  connection.execSql(request);
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/user', async (req, res) => {
  // let success = await executeStatement(queries.USER, (rows, data) => {
  //   console.log(data + ' rows');
  //   res.json({
  //     data: data.flat(),
  //   });
  // });
  // console.log(success);
  res.json({ hello: 'world2' });
});

// create a GET route
app.get('/accepted-offers', async (req, res) => {
  let success = await executeStatement(queries.ACCEPTED_OFFERS, (rows, data) => {
    console.log(data + ' rows');
    res.json({
      data: data.flat(),
    });
  });
  console.log(success);
});

// create a GET route
app.get('/offers', async (req, res) => {
  let success = await executeStatement(queries.OFFERS, (rows, data) => {
    console.log(data + ' rows');
    res.json({
      data: data.flat(),
    });
  });
  console.log(success);
});

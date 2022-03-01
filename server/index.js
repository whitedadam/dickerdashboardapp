const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const Connection = require("tedious").Connection;
const queries = require("./queries");

const config = {
  server: "codingwpride.database.windows.net",
  options: {
    database: "DICKERdashboard",
  },
  authentication: {
    type: "default",
    options: {
      userName: "Adam",
      password: "CodingWPride2021",
    },
  },
};

const connection = new Connection(config);

connection.on("connect", function (err) {
  if (err) {
    console.log("Error: ", err);
  }
  console.log("Connected to Database :)");
});

connection.connect();

const Request = require("tedious").Request;

async function executeStatement(sql, cb) {
  // const jsonArray = [];

  const newData = [];
  let dataset = {};

  //select * from dbo.Business Test Statement
  let request = new Request(sql, function (err) {
    if (err) {
      console.log(err);
    } else {
      cb(newData);
      // console.log(rowCount + " rows");
    }
  });

  request.on("row", function (columns) {
    columns.forEach(function (column) {
      // console.log(column.value);
      dataset[column.metadata.colName] = column.value;
    });
    newData.push(dataset);
    dataset = {};
  });

  connection.execSql(request);
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/users", async (req, res) => {
  console.log("/users endpoint hit");
  let success = await executeStatement(queries.USER, (rows) => {
    // console.log(rows + ' rows');
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    // res.json({
    //   data: rows,
    // });
    res.send(rows);
  });
  return success;
});

// create a GET route
app.get("/accepted-offers", async (req, res) => {
  console.log("/accepted-offers endpoint hit");
  let success = await executeStatement(queries.ACCEPTED_OFFERS, (rows) => {
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    // res.json({
    //   data: rows,
    // });
    res.send(rows);
  });
  // console.log()
  // console.log(success);
  return success;
});

// create a GET route
app.get("/offers", async (req, res) => {
  console.log("/offers endpoint hit");
  let success = await executeStatement(queries.OFFERS, (rows) => {
    // console.log(rows.length + ' rows');
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    // res.json({
    //   data: rows,
    // });
    res.send(rows);
  });
  return success;
});

// create a GET route
app.get("/subcategories", async (req, res) => {
  console.log("/subcategories endpoint hit");
  let success = await executeStatement(queries.SUBCATEGORIES, (rows) => {
    // console.log(rows.length + ' rows');
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    // res.json({
    //   data: rows,
    // });
    res.send(rows);
  });
  return success;
});

// create a GET route
app.get("/businesses", async (req, res) => {
  console.log("/businesses endpoint hit");
  let success = await executeStatement(queries.BUSINESSES, (rows) => {
    // console.log(rows.length + ' rows');
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    // res.json({
    //   data: rows,
    // });
    res.send(rows);
  });
  return success;
});
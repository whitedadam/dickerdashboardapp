const express = require("express");
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const queries = require("./queries");

// Creating Express app and setting port value
const app = express();
const port = process.env.PORT || 5000;

// Setting configuration for accessing hosted SQL DB with tedious
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

// Creating connection obj for accessing db data
const connection = new Connection(config);

connection.on("connect", function (err) {
  if (err) {
    console.log("Error: ", err);
  }
  console.log("Connected to Database :)");
});

connection.connect();

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

// Client Side Routing
app.use(express.static("build"));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// Users
app.get("/users", async (req, res) => {
  console.log("/users endpoint hit");
  let success = await executeStatement(queries.USER, (rows) => {
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    res.send(rows);
  });
  return success;
});

// Accepted Offers
app.get("/accepted-offers", async (req, res) => {
  // Pull dynamic params from req body
  // Pass into function to generate sql
  console.log("/accepted-offers endpoint hit");
  let success = await executeStatement(queries.ACCEPTED_OFFERS, (rows) => {
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    res.send(rows);
  });
  return success;
});

// Offers
app.get("/offers", async (req, res) => {
  console.log("/offers endpoint hit");
  let success = await executeStatement(queries.OFFERS, (rows) => {
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    res.send(rows);
  });
  return success;
});

// Subcategories
app.get("/subcategories", async (req, res) => {
  console.log("/subcategories endpoint hit");
  let success = await executeStatement(queries.SUBCATEGORIES, (rows) => {
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    res.send(rows);
  });
  return success;
});

// Businesses
app.get("/businesses", async (req, res) => {
  console.log("/businesses endpoint hit");
  let success = await executeStatement(queries.BUSINESSES, (rows) => {
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    res.send(rows);
  });
  return success;
});

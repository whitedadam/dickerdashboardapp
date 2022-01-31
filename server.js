const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const Connection = require("tedious").Connection;
const path = require("path");
const users = require('./src/mock-data.json');

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

function executeStatement() {
  let jsonArray = [];
  //select * from dbo.Business Test Statement
  let sql =
    "Select TOP (1000) [MerchantId],[FirstName],[LastName],[PhoneNumber],[Email],[AppUserId],[DateCreated] FROM [Merchant] WHERE MerchantId = 1";
  let request = new Request(sql, function (err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log(rowCount + " rows");
    }
  });

  request.on("row", function (columns) {
    columns.forEach(function (column) {
      console.log(column.value);
      jsonArray.push(column);
    });
  });

  connection.execSql(request);

  console.log(jsonArray);
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/backend", (req, res) => {
  let success = executeStatement();
//   console.log(success);
  //   res.send({ data: JSON.stringify(success) });
  //   res.send('Boy, I wish I know how to use Express!');
  res.json(success);
});

// create a POST route
// app.get("/backend", (req, res) => {
//   //   res.send({ data: JSON.stringify(success) });
//     res.send(req.body);
//   });

// Sample of Sending JSON via Expresss
app.get("/api/users", (req, res) => {
  res.json(users); // imported data from json file
});

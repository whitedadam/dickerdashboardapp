const express = require("express");
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const queries = require("./queries");
const bodyParser = require('body-parser');
// Creating Express app and setting port value
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

var cors = require('cors')
app.use(cors())


// Client Side Routing
app.use(express.static("build"));

// This displays message that the server running and listening to specified port


// Users
app.get("/users", async (req, res) => {
  console.log("/users endpoint hit");
  let success = await executeStatement(queries.USERS, (rows) => {
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
app.post("/login",async (req,
                        res) => {
    const username = req.body.user.username;
    const password = req.body.user.password;
    console.log ("login:", username, " / ", password);
    const select = `SELECT PasswordHash, Admin FROM AspNetUsers2 WHERE UserName = '${username}' `;
    let success = await executeStatement(select, (rows) => {
      let obj=[];
      console.log ("ADMIN VALUE: ", rows[0].Admin);
      if(rows.length===0 || rows[0].PasswordHash !== password)
        obj={status: -1, message:"Invalid login", admin:false};
      else
       obj={status: 1, message:"User logged in", admin: rows[0].Admin};

    console.log("login result: ", obj);
    res.send(obj);
    //console.log(`Fetched ${rows.length} rows`);
   // console.log(`Data: ${JSON.stringify(rows, null, 2)}`);

    });
})

app.post("/registerNew", async (req,
                                res) => {
  console.log("body", req.body.user);
  const user = req.body.user;
  const insert = `INSERT INTO [dbo].[AspNetUsers2] (UserName, PasswordHash, Admin) VALUES('${user.regEmail}', '${user.createPass}', '0')`;

  console.log("/register endpoint hit", insert);
  let success = await executeStatement(insert, (rows) => {
    console.log(`Fetched ${rows.length} rows`);
    console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    res.send(rows);
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));

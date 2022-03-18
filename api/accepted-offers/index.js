const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const queries = require("../../server/queries");

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

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  let data = undefined;
  executeStatement(queries.ACCEPTED_OFFERS, (rows) => {
    // console.log(`Fetched ${rows.length} rows`);
    // console.log(`Data: ${JSON.stringify(rows, null, 2)}`);
    data = rows;
    console.log(rows);
    context.res.send(JSON.stringify(rows));
  });

//   context.res = {
//     // status: 200, /* Defaults to 200 */
//     body: data,
//     contentType: "application/json",
//   };

  //console.log(context.res);
};

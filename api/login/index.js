const Connection = require("tedious").Connection;
const Request = require("tedious").Request;

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
    request.on("row", (columns) => {
      let dataset = {};
      columns.forEach((column) => {
        dataset[column.metadata.colName] = column.value;
      });
      result.push(dataset);
      dataset = {};
    });

    // Once connected, reject on error or execute query
    connection.on("connect", (err) => {
      if (err) {
        reject(err);
      } else {
        connection.execSql(request);
      }
    });

    connection.connect();
  });

module.exports = async function (context, req) {
  context.log("POST Request to: /api/login");
  // Variables we're passing to db
  const username = req.body.user.username;
  const password = req.body.user.password;
  console.log("login:", username, " / ", password); //tracking data capture

  const select = `SELECT Id, PasswordHash, Admin, MerchantId, LockoutEnabled FROM AspNetUsers2 WHERE UserName = '${username}' `;

  // Try to post data
  try {
    const data = await executeSql(select);
    const user = data[0];

    // Checking if password valid
    if (password !== user.PasswordHash) {
      // User Password incorrect
      throw new Error(
        "Invalid login info! Check your password or email and try again."
      );
    }

    // Checking that user is not locked out
    if (user.LockoutEnabled) {
      throw new Error(
        "User currently lockedout of system. Please contact admin team."
      )
    }

    // Returning only releveant info to frontend.
    context.res = {
      body: {
        isAdmin: user.Admin,
        merchantId: user.MerchantId,
        Id: user.Id
      },
    };
    context.done();
  } catch (error) {
    context.res = {
      status: 401,
      body: error.message,
    };
  }
};

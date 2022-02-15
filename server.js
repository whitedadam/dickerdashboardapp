const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const Connection = require("tedious").Connection;
const path = require("path");
const users = require("./src/mock-data.json");

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
const userSQL =
  "Select TOP (1000) [MerchantId],[FirstName],[LastName],[PhoneNumber],"+
  "[Email],[AppUserId],[DateCreated] FROM [Merchant] WHERE MerchantId = 1";
const acceptedOffersSQL =
  "SELECT TOP (1000) [AcceptedOfferId],[OfferCode],[ExpirationDateTime],"+
  "[IsRedeemed],[Business_FK],[Offer_FK],[Consumer_FK],[Created],[Discount]"+
  ",[Updated] FROM [AcceptedOffer]";
const offersSQL = 
  "SELECT TOP (1000) [OfferId],[Disclaimer],[TargetDiscountPct],[LowestDiscountPct]"+
  ",[HighestDiscountPct],[StartingDate],[EndingDate],[IsActive],[DateTimeCreated],"+
  "[DateTimeUpdated],[Friday],[InitialQuantity],[Monday],[QuantityRemaining],"+
  "[Saturday],[Sunday],[Thursday],[Tuesday],[Wednesday],[Business_FK] FROM [Offer]";

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

  request.on("row", function (columns) {
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
app.get("/user", async (req, res) => {
  let success = await executeStatement(userSQL, (rows, data) => {
    console.log(data + " rows");
    res.json({
      data: data.flat(),
    });
  });
  console.log(success);
});

// create a GET route
app.get("/acceptedOffers", async (req, res) => {
  let success = await executeStatement(acceptedOffersSQL, (rows, data) => {
    console.log(data + " rows");
    res.json({
      data: data.flat(),
    });
  });
  console.log(success);
});

// create a GET route
app.get("/offers", async (req, res) => {
  let success = await executeStatement(offersSQL, (rows, data) => {
    console.log(data + " rows");
    res.json({
      data: data.flat(),
    });
  });
  console.log(success);
});


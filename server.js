const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const Connection = require('tedious').Connection;

const config = {
  server: "codingwpride.database.windows.net",
    options: {
        database: "DICKERdashboard"
    },
    authentication: {
      type: "default",
        options: {
          userName: "Adam",
            password: "CodingWPride2021",
        }
    }
};

const connection = new Connection(config);

connection.on('connect', function(err) {
    if(err) {
        console.log('Error: ', err)
    }
    console.log('Connected to Database :)');
});

connection.connect();

const Request = require('tedious').Request;

function executeStatement() {
    //select * from dbo.Business Test Statement
    let request = new Request("Select TOP (1000) [MerchantId],[FirstName],[LastName],[PhoneNumber],[Email],[AppUserId],[DateCreated] FROM [Merchant] WHERE MerchantId = 1", function(err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
    });

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log(column.value);
        });
    });

    connection.execSql(request);
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
    let success = executeStatement();
    console.log(success);
    res.send({ data: success }); //Line 10
}); //Line 11
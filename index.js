const express = require('express'); //https://www.npmjs.com/package/express
const cors = require('cors'); //https://www.npmjs.com/package/cors
const sql = require('mssql'); //https://www.npmjs.com/package/mssql
const app = express(); //Start the server
const sqlServer = 'hasea\\SQLExpress' //The server. I figured easier to keep at the top in case I change it elsewhere

const selectAllQuery = 'SELECT * FROM dbo.users'; //Query as a const
//Configuration to connect to local DB. 
const config = {
    user: 'nbar',
    password: 'nb',
    server: sqlServer,
    database: 'nirvanaBar'
}
//SQL Select allowing me to add multiple queries to the same method

function DBconn(query, res) {
    //Close SQL first incase, I can't seem to close it at the end without everything breaking will fix later. 
    sql.close();
    //Connect See documentation for mssql REMEMBER catch the error or everything goes to hell
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request(); //here is the request constructor
        request.query(query, function (err, row) { //here be the query, res is useful for return responses on the express server. 
            if (err) console.log(err)
            res.json(
                row.recordset //Defines the recordset so that it cleans up the crap around it as it calls multiples elements
            )
        })
    })
}
app.use(cors());
//Mapping out the API's for react
app.get('/', (req, res) => {
    res.send("Hello from the server")

});

app.get('/users', (req, res) => {

    DBconn(selectAllQuery, res);



})
app.listen(4000, () => {
    console.log(`Server started on port 4000`)
})

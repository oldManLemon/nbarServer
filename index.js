const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const sqlServer = 'hasea\\SQLExpress'

const selectAllQuery = 'SELECT * FROM dbo.users';
const config = {
    user: 'nbar',
    password: 'nb',
    server: sqlServer,
    database: 'nirvanaBar'
}
//SQL Select function

function DBconn(query, res) {

    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();


        request.query(query, function (err, row) {
            if (err) console.log(err)
            res.json({
                data: row
            })
        })
    })
}
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello from the server")

});

app.get('/users', (req, res) => {
    //query?
    //var andrew = "select * from dbo.users where firstName = 'Andrew';"
    var matt = "select * from dbo.users where firstName = 'Matt';"
    //DBconn(selectAllQuery,res);
    DBconn(matt, res);

})
app.listen(4000, () => {
    console.log(`Server started on port 4000`)
})


/* 
DBconnection.query(selectAllQuery, (err, results) => {
    if(err){
        return res.send(err)
    }else{
        res.json({
             data: results
        })
    }
}) */
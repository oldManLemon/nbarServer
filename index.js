const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
const sqlServer = 'hasea\\SQLExpress'

const selectAllQuery = 'SELECT * FROM dbo.users';
const config ={
    user: 'nbar',
    password: 'nb',
    server: sqlServer,
    database: 'nirvanaBar'
}

//Try Async Promisem the use another function to call data

const DBconnection = (async function (query) {
    let pool = await sql.connect(config);
    return await pool.request()
    .query(selectAllQuery)
    .catch(err => {
        if(err)
        console.log(err)
        return err;
    }) 

});

//Capture Data
 var all = DBconnection()
// console.log(DBconnection)
 .then(result => {
    result.recordset.forEach(element => {
        console.log(element)
        
        
    }); 
});



app.use(cors());

app.get('/', (req,res) => {
res.send("Hello from the server")
 
});

app.get('/users', (req, res) => {
   res.send(all)
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
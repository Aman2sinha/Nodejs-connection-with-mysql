const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const port = process.env.PORT || 5000
app.use(express.urlencoded({extended: false})); // New
app.use(express.json()); // New
//connection with db
const pool  = mysql.createPool({
   connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : '123',
    database        : 'curd'
})

app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from curd', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from curd table are: \n', rows)
        })
    })
})



app.listen(port,()=> console.log(`listening on port ${port}`))
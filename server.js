const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const db = mysql.createConnection ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

//connecting to database
db.connect((err) => {
    if(err){
        return console.log('Error connecting to database', err)
    }
    console.log ('Connection Sucessful :', db.threadId)
});

//  question 1 
app.get('', (req, res) => {
    const patients = 'SELECT * FROM patients'
    db.query(patients, (err, results) => {
        if (err){
            return res.status(500).send('Failed to get patients information', err)      
          }
          res.status(200).send(results)
    });
});     
 

// question 2 
app.get('/provider', (req, res) => {
    const provider = 'SELECT first_name, last_name, provider_specialty FROM providers'
    db.query(provider, (err, results) => {
        if (err){
            return res.status(500).send('Failed to get providers information', err)      
          }
          res.status(200).send(results)
    });
});     

// question 3 
app.get('/patients2', (req, res) => {
    const patients2 = 'SELECT * FROM patients ORDER BY first_name;'
    db.query(patients2, (err, results) => {
        if (err){
            return res.status(500).send('Failed to get patients information', err)      
          }
          res.status(200).send(results)
    });
});     


// question 4 
app.get('/provider2', (req, res) => {
    const provider2 = 'SELECT * FROM providers ORDER BY provider_specialty'
    db.query(provider2, (err, results) => {
        if (err){
            return res.status(500).send('Failed to get providers information', err)      
          }
          res.status(200).send(results)
    });
});     

// listen to the server 
app.listen(4500, () =>{
        console.log('Server is running on port 4500.......')
});
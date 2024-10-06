const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mysql = require('mysql2');

const db = mysql.createConnection ({
   user : process.env.DB_USERNAME,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
});

dotenv.config();
//connecting to database
db.connect((err) => {
    if(err){
        return console.log('Error connecting to database', err)
    }
    console.log ('Connection Sucessful :', db.threadId)
});

//  question 1 
app.get('/patients', (err, results) => {
    const patients = 'SELECT * FROM patients'
    db.connect(patients, (req, res) => {
        if (err){
            return res.status(500).send('Failed to get patients information', err)      
          }
          res.status(200).send(results)
    }) 
});     
 

// question 2 
app.get('/provider', (err, results) => {
    const provider = 'SELECT first_name, last_name, provider_specialty FROM providers'
    db.connect(provider, (req, res) => {
        if (err){
            return res.status(500).send('Failed to get providers information', err)      
          }
          res.status(200).send(results)
    }) 
});     

// question 3 
app.get('/patients2', (err, results) => {
    const patients2 = 'SELECT * FROM patients ORDER BY first_name;'
    db.connect(patients2, (req, res) => {
        if (err){
            return res.status(500).send('Failed to get patients information', err)      
          }
          res.status(200).send(results)
    }) 
});     


// question 4 
app.get('/provider2', (err, results) => {
    const provider2= 'SELECT * FROM providers ORDER BY provider_specialty'
    db.connect(provider2, (req, res) => {
        if (err){
            return res.status(500).send('Failed to get providers information', err)      
          }
          res.status(200).send(results)
    }) 
});     
app.listen(3300,() =>{
        console.log('Server is running on port 3300.......')
});

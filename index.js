const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose'); 
const { dbConnect } = require('./db-mongoose'); 
const {router: userRouter } = require('./routers/user-router'); 
const jsonParser = require('body-parser').json(); 

app.use('/users/', userRouter); 


app.get('*', (req, res) => {
    res.status(400).json({ message: "Route not found" }); 
}); 

app.listen(8080, () => console.log('Your API is listening on port 8080'));

if(require.main === module) {
    dbConnect(); 
}

module.exports={ app }; 
const mongoose = require('mongoose'); 
const { DATABASE_URL } = require('./config'); 

const dbConnect = (url=DATABASE_URL) => {
    mongoose.connect(url)
        .then(() => console.log('Mongoose has connected to the database'))
        .catch(err => {
            console.error('Mongoose failed to connect');
            console.error(err); 
        }); 
}

const dbDisconnect = () => {
    mongoose.disconnect()
}

module.exports={
    dbConnect, 
    dbDisconnect
}
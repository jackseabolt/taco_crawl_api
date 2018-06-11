'use strict'; 

const router = require('express').Router(); 
const jsonParser = require('body-parser').json(); 
const { User } = require('../models'); 

router.post('/new', jsonParser, (req, res) => {
    const { firstName, lastName, username, password } = req.body; 

    if(username.length < 5) {
        return res.status(400).json({ message: 'Username must be 5 characters long'})
    }

    if(password.length < 5) {
        return res.status(400).json({ message: 'Password must be 5 characters long'})
    }

    User.create({ firstName, lastName, username, password }) 
        .then(user => {
            res.status(201).json(user.apiRepr()); 
        })
        .catch(err => {
            res.status(400).json({ message: 'Your request contained invalid data'}); 
        });
}); 

module.exports={ router }; 
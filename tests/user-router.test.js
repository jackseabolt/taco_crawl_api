'user strict'; 

const {TEST_DATABASE_URL} = require('../config'); 
const {dbConnect, dbDisconnect} = require('../db-mongoose'); 
const chai = require('chai'); 
const chaiHttp = require('chai-http'); 
const { app } = require('../index');
const { User } = require('../models');  

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect; 
chai.use(chaiHttp); 

describe('user router', () => {
    before(() => {
        return dbConnect(TEST_DATABASE_URL); 
    }); 

    after(() => {
        return dbDisconnect(); 
    });

    afterEach(()=> {
        return User.remove({}); 
    }); 

    // setup data
    const firstName = 'testfirst'; 
    const lastName = 'testlast'; 
    const username = 'testusername'; 
    const password = 'testpassword'; 

    describe('/users/new POST', () => {
        it('given proper data, should return 201 with new user', () => {
            return chai.request(app)
            .post('/users/new')
            .send({ firstName, lastName, username, password })
            .then(res => {
                expect(res).to.have.status(201); 
                expect(res).to.be.json; 
                expect(res.body.firstName).to.equal('testfirst'); 
                expect(res.body.lastName).to.equal('testlast'); 
                expect(res.body.username).to.equal('testusername');
                expect(res.body.password).to.equal(undefined);  
            }); 
        }); 
    }); 
}); 

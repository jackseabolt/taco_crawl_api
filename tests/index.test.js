'user strict'; 

const {TEST_DATABASE_URL} = require('../config'); 
const {dbConnect, dbDisconnect} = require('../db-mongoose'); 
const chai = require('chai'); 
const chaiHttp = require('chai-http'); 
const { app } = require('../index'); 

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect; 
chai.use(chaiHttp); 

describe('index router', function() {
    before(() => {
        return dbConnect(TEST_DATABASE_URL); 
    }); 

    describe('/ GET', () => {
        it('should return with 400 and error message', () => {
            return chai.request(app)
            .get('/')
            .then(res => {
                expect(res).to.have.status(400); 
                expect(res).to.be.json; 
                expect(res.body.message).to.equal('Route not found'); 
            }); 
        }); 
    }); 
}); 
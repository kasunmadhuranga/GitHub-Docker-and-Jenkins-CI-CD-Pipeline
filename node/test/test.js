var request = require('supertest');
var app = require('../index.js');
describe('GET /world', function () {
    it('respond with hello world', function (done) {
        request(app).get('/world').expect('{ "response": "Hello World" }', done);
    });
});
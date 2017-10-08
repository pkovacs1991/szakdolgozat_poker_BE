"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chaiHttp = require("chai-http");
var App_1 = require("../src/App");
chai.use(chaiHttp);
var expect = chai.expect;
describe('baseRoute', function () {
    it('should be json', function () {
        return chai.request(App_1.default).get('/')
            .then(function (res) {
            expect(res.type).to.eql('application/json');
        });
    });
    it('should have a message prop', function () {
        return chai.request(App_1.default).get('/')
            .then(function (res) {
            expect(res.body.message).to.eql('Hello World!');
        });
    });
});

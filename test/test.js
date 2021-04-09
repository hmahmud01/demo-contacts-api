const express = require('express');
const chai = require('chai');
const request = require('supertest');
const { expect } = require('chai');

const app = express();

// People API Test Cases
// 1. Test to create a contact
// 2. Test not to create a contact
describe('POST request for People', () => {
    it('should create a people with proper entry', () => {
        request(app)
        .post('people/')
        .send(
            {
                "name": "ultron",
                "age": 26,
                "height": 155
            }
        )
        .expect(201)
        .then((res) => {            
            expect(res.headers.location).to.be.eql('people/');
        })
    });
    it('should not create a people with object entry', () => {
        request(app)
        .post('people/')
        .send(
            {
                "name": {},
                "age": 26,
                "height": 155
            }
        )
        .expect(500)
        .then((res) => {            
            expect(res.headers.location).to.be.eql('people/');
        })
    });
}); 

// Contact API Test Cases
// 1. Test to create a Contact
// 2. Test not to create a Contact
describe('POST request for contact', () => {
    it('should create a contact under ObjectId 606e361f2a3c1a4c9ce55b09 ', () => {
        request(app)
        .post('people/606e361f2a3c1a4c9ce55b09/contacts')
        .send(
            {
                "email": "hero@avenger",
                "phone": "0166654812"
            }
        )
        .expect(201)
        .then((res) => {
            expect(res.headers.location).to.be.eql('people/606e361f2a3c1a4c9ce55b09/contacts')
        })
    })

    it('should not create a contact under ObjectId 606e361f2a3c1a4c9ce55b09 ', () => {
        request(app)
        .post('people/606e361f2a3c1a4c9ce55b3329/contacts')
        .send(
            {
                "email": [],
                "phone": "0166654812"
            }
        )
        .expect(500)
        .then((res) => {
            expect(res.headers.location).to.be.eql('people/606e361f2a3c1a4c9ce55b09/contacts')
        })
    })
})

// Search API Test Cases
// 1. Able to search querystring
describe('GET querystring request', () => {
    it('should find output for ron search', ()=> {
        request(app)
        .get('contacts?q=ron')
        .expect(200)
        .then((res) => {
            expect(res.headers.location).to.be.eql('contacts?q=ron')
        })
    })
})
const peopleModel = require('../models/people.js');

// People Create Controller
exports.insert = (req, res) => {
    if(!req.body.name || !req.body.age || !req.body.height){
        res.status(500);
        res.json({message: "Bad Request"});
    }else{
        peopleModel.createPeople(req.body)
            .then((result) => {
                res.status(201)
                .send({id: result._id});
            }).catch((error)=> {
                res.status(500)
                .send({message: "Couldn't Add"});
            })
    }
}

// Retrieve the list of people  Controller
exports.listPeople = (req, res) => {
    peopleModel.list(req, res);
}


exports.insertContact = (req, res) => {
    if(!req.body.email || !req.body.number){
        res.status(500)
        .send({message: "Bad REquest"})
    }else{
        peopleModel.createContact(req.params.id, req.body)
            .then((result) => {
                res.status(201)
                .send({id: result._id});
            }).catch((error) => {
                res.status(500)
                .send({message: error});
            })
    }    
}

// Contact Create Controller
exports.insertContact2 = (req, res) => {
    if(!req.body.email || !req.body.number || !(typeof req.body.email === 'string') || !(typeof req.body.number === 'string')){
        res.status(500)
        .send({message: "Bad Request with different inputs"})
    }else{
        peopleModel.createContact2(req.params.id, req.body)
            .then((result) => {
                res.status(201)
                .send({id: result._id});
            }).catch((error) => {
                res.status(500)
                .send({message: error});
            })
    }    
}

// Query Search Controller
exports.search = (req, res) => {
    if(!req.query.q){
        res.status(500)
        .send({message : "Request incomplete Please put a querystring in the url"})
    }else{        
        console.log(req.query.q)        
        peopleModel.findPeople(req.query.q, res);
    }    
}
const e = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// MongoDB Connection
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/test_db')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error("Coudn't connect MongoDB....", err));


// Contact Schema and Model
var contactSchema = new Schema({
    email: String,
    number: String
})
const Contact = mongoose.model("contact", contactSchema);

// People Schema and Model
var peopleSchema = new Schema({
    name: String,
    age: Number,
    height: Number,
    contacts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact'
    }
});

const People = mongoose.model("people", peopleSchema);

// People Create Function
// takes only user data to create People
exports.createPeople = (userData) => {
    const people = new People(userData);
    return people.save();
};

exports.createContact = (id, contactData) => {    
    const contact = new Contact(contactData)    
    Contact.findOne({email: contactData.email}, (err, entry) => {
        if (err){
            console.log(err);
            return err;
        }else if(entry){
            console.log("Contact Already exists", entry);
            return entry;
        }else{
            Contact.findOne({number: contactData.number}, (err, entry) =>{
                if(err){
                    console.log(err);
                    return err;
                }else if(entry){
                    console.log("Contact Already exists", entry);
                    return entry;
                }else{
                    contact.save()
                        .then((result) => {
                            return People.findOneAndUpdate(
                                { _id: id },
                                { $push: {contacts: result._id} }
                            );
                        })
                        .then((result) => {
                            console.log('contact updated ' , result);
                        })
                        .catch((error)=> {
                            console.log('error ', error);
                        })
                }
            })
        }
            
    })   
    return contact; 
}


// Contact Create Function. It Creates a contact under the id of People
// It takes id of people and contactdata to create a contact
exports.createContact2 = (id, contactData) => {
    const contact = new Contact(contactData);
    return contact.save()
        .then((result) => {
            return People.findOneAndUpdate(
                { _id: id },
                { $push: {contacts: result._id} }
            );
        })
        .then((result) => {
            console.log('contact updated ' , result);
        })
        .catch((error)=> {
            console.log('error ', error);
        })
}

// List of all People
exports.list = (req, res) => {
    People.find((err, response) => {
        res.json(response);
    });       
};


// Free Text Query Search Functions with a parameter of query
// Steps It follows to search in the database
// First it Searches in People Model 
// If any object is found then it is returned
// Else it searches in the Contact Model
// If Found returns the array of id and searches for the corresponding People in People Model and Returns the response
// If nothing found then returns a message

exports.findPeople = (query, res)  => {
    console.log("query is ", query);    
    People.find({"name": { $regex: '.*' + query + '.*' }}, (err, response) => {               
        if(Object.keys(response).length != 0){
            res.status(200)
            .send(response)    
        }else{
            Contact.find({ $or: [{"email": { $regex: '.*' + query + '.*' }}, {"number": { $regex: '.*' + query + '.*' }}]}, (err, response) => {    
                if(Object.keys(response).length != 0){
                    let contactId = [];
                    response.forEach(function (responseObj) {
                        contactId.push(responseObj._id);
                    });     
                    let PeopleObjs = [];
                    contactId.forEach(function (contact) {
                        People.find({"contacts": contact}, (err, response) => {                            
                            PeopleObjs.push(response[0]);
                        })
                    })  
                    setTimeout(function(){
                        console.log(PeopleObjs);
                        res.status(200)
                        .send(PeopleObjs)
                      },100);
                }else{
                    res.status(200)
                    .send({message: "Not found"})
                }
            })            
        }
    })       
}

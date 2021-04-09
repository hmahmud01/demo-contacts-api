# demo-contacts-api
*Node Js Backend Assessment for Nanoid*

This project is for Assessment purpose only
Project is Completed in the environment of Node@14.15.4 and npm@6.14.10 and MOngoDB was used for Database

## Instructions to Run this project
Follow the stpes to Run the project.
* Clone this project first
* cd into project root directory
* Install dependencies by running ```npm install```
* run ```npm run test``` for running Test Output
* run ```npm start```

## People API Test Instruction
Follow the steps to test the apis
* Start Postman Application first
* Select ```POST``` from the method dropdown and type ```http://localhost:3000/people``` in the url
* Click to body tab and select raw format to json input
* Sample json data would be 
```json
{
    "name" : "Iron Man",
    "age": 33,
    "height": 143
}
```
* click send it will respond with ```201``` with the id of the created people.
```json
{
    "id": "60702dd80a92641710ce0c5c"
}
```
If there is no data or wrong data type input made, it will respond ```500```

## Contacts API Test Instruction
* Select ```POST``` from the method dropdown and type ```http://localhost:3000/people/60702dd80a92641710ce0c5c/contacts``` in the url
* Click to body tab and select raw format to json input
* Sample json data would be 
```json
{
    "email": "ironman@avengers.com",
    "number": "01755569215"
}
```
* click send it will respond with ```201``` with the id of the created people.
```json
{
    "message": "contact created"
}
```
If there is no data or wrong data type input made, it will respond ```500```

## Free Text Query Search API Test
* Select ```GET``` from the method dropdown and type ```http://localhost:3000/people``` in the url
* Click Params tab and enter the values for query
* in Key column add ```q``` and in the value column add the query string for example ```avengers.com```
* Hit Send button
* Server will respond ```200``` with the corresponding people list with the matched keyword for name, email and number
* Sample output would be like
```json 
[
    {
        "_id": "60702dd80a92641710ce0c5c",
        "name": "Iron Man",
        "age": 33,
        "height": 143,
        "__v": 0
    }
]
```
If there is no data or wrong data type input made, it will respond ```500```

# CONCLUSION
Make Sure Mongo db is installed and all the dependencies are installed properly for the Project
Thanks


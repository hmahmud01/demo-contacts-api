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

## API Test Instruction
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
* click send it will respond with ```201``` if there is no data or wrong data type input made, it will respond ```500```
                  

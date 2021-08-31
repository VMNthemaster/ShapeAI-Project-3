require('dotenv').config();

const express = require("express");

const mongoose = require("mongoose");

//Importing Different Schrma
const Book = require('./schema/book');
const Author = require('./schema/author');
const Publication = require('./schema/publication');

//database
const Database = require("./database");
const BookModel = require('./schema/book');
const AuthorModel = require('./schema/author');
const PublicationModel = require('./schema/publication');

//API
const Book = require('./API/book')
const Author = require('./API/author')
const Publication = require('./API/publication')


mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
)
    .then(() => console.log("connection established!"))
    .catch((err) => {
        console.log(err);
    });

//initialization
const ourAPP = express();

//IMPLEMENTATION
ourAPP.use(express.json());

//Microservices
ourAPP.use("/book", Book);
ourAPP.use("/author", Author); 
ourAPP.use("/publication", Publication);

ourAPP.get("/",(request, response) => {  // localhost:4000 is same as localhost:4000/
    response.json({message:"Server is working"});
});









ourAPP.listen(4000, () => console.log("Server is running")); // function is optional


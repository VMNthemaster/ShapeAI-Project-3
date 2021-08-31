const mongoose = require('mongoose');

//Publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
});

//create publication mode;
const PublicationModel = mongoose.model("publications", PublicationSchema); //here publication refers to the name of collection given in mongoDB

module.exports = PublicationModel;
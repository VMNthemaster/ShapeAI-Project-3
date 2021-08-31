const Router = require('express').Router();

const AuthorModel = require('../schema/author');

// Route        - /authors
// Desc         - To get all authors
// Access       - Public
// Method       - GET
// Params       - None
// Body         - None
Router.get("/authors", async(req, res) => {
    // return res.json({authors: Database.Author});
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// Route        - /authors/:authorID
// Desc         - To get specific author by outting ID
// Access       - Public
// Method       - GET
// Params       - authorID
// Body         - None
Router.get("/authors/:authorID", (req, res) => {
    const getAuthor = Database.Author.filter((item) => item.id === parseInt(req.params.authorID)); //req.params.x ; In x we write the same what is written in the path which is the last variableof the path  
    return res.json({author: getAuthor});
});

// Route        - /authors/new
// Desc         - To add a new author
// Access       - Public
// Method       - POST
// Params       - None
// Body         - yes
Router.post("/author/new", (req, res) => {
    const {newAuthor} = req.body;   //this is called destructuring of data....we write the data explicitly in an object...it is used when we have to add different types of data via a single route.
    //add new data
    // Database.Author.push(newAuthor);/
    Author.create(newAuthor);
    return res.json({message: 'Author added to the database successfully'});
    // console.log(newAuthor);    //here we are sending just one type of data but did so to know that this can also be done
    // return res.json({message: "author added successfully"});
});


// route       /authorName/update/:id
// desc        to update details of author
// access      public
// params      id
// method      put
// body        yes
Router.put("/authorName/update/:id", (req, res) => {
    const {newName} =  req.body;
    const {id} = req.params;

    const name = Database.Author.map((item) => {
        if(item.name === id){
            if(!item.name.includes(newName)){
                return item.name.push(newName);
            }
            return item;
        }
        return item;
    })
    const books = Database.Author.map((item) => {
        if(item.name === id){
            if(!item.books.includes(id)){
                return item.books.push(id);
            }
            return item;
        }
        return item;
    })
    return res.json({name:name, books:books})
})

Router.put("/author/update/:id", (req, res) => {
    const {updateAuthor} = req.body;
    const {id} = req.params;

    const author = Database.Author.map((item) => {
        if(item.id === parseInt(id)){
            return {...item, ...updateAuthor}
        }
        return item;
    })
    return res.json(author);
});





// route       '/author/delete/:id'
// desc        to delete a author
// access      public 
// params      id
// method      delete
// body        none   
Router.delete("/author/delete/:id", (req, res) => {
    const {id} = req.params;

    // const filteredAuthors = Database.Author.filter((item) => item.id !== parseInt(id))

    // Database.Author = filteredAuthors;

    // res.json(Database.Author);

    const updateAuthorDatabase = await AuthorModel.findOneAndDelete(
        {
            id: id
        }
    )


    return res.json({authors:updateAuthorDatabase});
});

module.exports = Router;
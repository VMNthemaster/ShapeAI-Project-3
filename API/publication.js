const Router = require('express').Router();

const PublicationModel = require('../schema/publication');

// Route        - /publications
// Desc         - To get all publicationss
// Access       - Public
// Method       - GET
// Params       - None
// Body         - None
Router.get("/publications", (req, res) => {
    return res.json({publications: Database.Publication});
});

// Route        - /publications/:publicationID
// Desc         - To get specific publication using publication ID
// Access       - Public
// Method       - GET
// Params       - publicationID
// Body         - None
Router.get("/publications/:publicationID", (req, res) => {
    const getPublication = Database.Publication.filter((item) => item.id === parseInt(req.params.publicationID))
    return res.json({publication: getPublication}); 
});

// Route        - /publications/b/:book_name
// Desc         - To get specific publication using book name
// Access       - Public
// Method       - GET
// Params       - book_name
// Body         - None 
Router.get("/publications/b/:book_name", (req, res) => {
    const getPublication = Database.Publication.filter((item) => item.books.includes(req.params.book_name))
    return res.json({publication: getPublication});
});





// Route        - /publications/new
// Desc         - To add a new publications
// Access       - Public
// Method       - POST
// Params       - None
// Body         - yes
Router.post("/publications/new", (req, res) => {
    const {newPublication} = req.body;
    //ADD new data
    Database.Publication.push(newPublication);
    return res.json(Database.Publication);
    // console.log(newPublication);
    // return res.json({message: "publication added successfully"});
});







    


// route       '/publication/delete/:id'
// desc        to delete a publication
// access      public 
// params      id
// method      delete
// body        none 
Router.delete("/publication/delete/:id", (req, res) => {
    const {id} = req.params;

    // const filteredPubs = Database.Publication.filter((item) => item.id !== parseInt(id));

    // Database.Publication = filteredPubs;

    // return res.json(Database.Publication);
    const updatePublicationDatabase = await PublicationModel.findOneAndDelete(
        {
            id: id
        }
    )


    return res.json({publications:updatePublicationDatabase});
    
})

// route       /publication/delete/book/:isbn/:id
// desc        delete a book from a publicaiton
// access      public
// params      id, isbn 
// method      delete 
// body        none
Router.delete("/publication/delete/book/:isbn/:id", (req, res) => {
    const {isbn, id} = req.params;

    Database.Book.forEach((book) => {
        if(book.ISBN === isbn){
            book.publication = 0;
            return book;
        }
        return book; 
    })

    Database.Publication.forEach((pub) => {
        if(pub.id === parseInt(id)){
            const filteredBooks = pub.books.filter((book) => book !== isbn);
            pub.books = filteredBooks;
            return pub;
        }
        return pub;
    }) 
    return res.json({book: Database.Book, publication: Database.Publication})
});

module.exports = Router;
const Router = require('express').Router();

const BookModel = require('../schema/book');
const AuthorModel = require('../schema/author');


// Route        - /book
// Desc         - To get all books
// Access       - Public
// Method       - GET
// Params       - None
// Body         - None
Router.get("/book", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

// Route        - /book/:bookID
// Desc         - To get specific book by putting ISBN
// Access       - Public
// Method       - GET
// Params       - bookID
// Body         - None
Router.get("/book/:bookID", async(req, res) => {  // :bookID is parameter == ISBN
    // const getBook = Database.Book.filter((book) => book.ISBN === req.params.bookID);  //creating a const since filter will return an array.
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.bookID});

    if(!getSpecificBook){
        return res.json({
            error: `No Book found for the ISBN of ${rweq.params.bookID}`,
        })
    }
    return res.json({book: getSpecificBook});    // book is a parameter which takes value of all the elements(objects here) in the array[Book] in a loop. hence book.ISBN.
});

// Route        - /book/c/:category   ...if we dont add /c(or something) then the structure of above and current api will be same
// Desc         - To get a list of books based on category
// Access       - Public
// Method       - GET
// Params       - category
// Body         - None
Router.get("/book/c/:category", async(req, res) => {
    // const getBook = Database.Book.filter((book) => book.category.includes(req.params.category));  // we are doing this because the catgory is an array while previously book ID was a string // this should ideally return true or false but it returns the whole object
    // return res.json({book: getBook});
    const getSpecificBook = await BookModel.findOne({category: req.params.category});
    if(!getSpecificBook){
        return res.json({error: `No book found for category ${req.params.category}`});
    }
    return res.json({books: getSpecificBook});
});

// Route        - /book/a/:author   
// Desc         - To get a list of books based on author
// Access       - Public
// Method       - GET
// Params       - author
// Body         - None
Router.get("/book/a/:author", (req, res) => {
    const getBook = Database.Book.filter((book) => book.authors.includes(parseInt(req.params.author)));  // we did parseInt because the elements of author in the database is in the form of integer and if we directly put it, it will consider number as an integer
    return res.json({book: getBook});
});

// Route        - /book/new
// Desc         - To add a new book
// Access       - Public
// Method       - POST
// Params       - None
// Body         - yes
Router.post("/book/new", async(req, res) => {
    try{
        const {newBook} =  req.body;
        await Book.create(newBook);
        return res.json({message: 'Book added to database'});
    }
    catch(error){
        return res.json({error: error.message})
    }
});

// Route        - /book/update/:isbn
// Desc         - To update a book
// Access       - Public
// Method       - PUT
// Params       - ISBN
// Body         - yes
Router.put("/book/update/:isbn", async(req, res) => {
    const { title} = req.body.title;
    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    },
    {
        title: title
    },
    {
        new: true
    }
    )
    return res.json({book: updateBook});
});

// route       /bookAuthor/update/:isbn
// desc        update/add a new author to a new book
// access      public
// params      isbn
// method      put
// body        yes
Router.put("/bookAuthor/update/:isbn", async(req, res) => {
    const {newAuthor} = req.body;
    const {isbn} = req.params;

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: isbn
         },
        {
            $addToSet: {
                authors: newAuthor
            }
        },
        {
            new: true
        }
    );
        const updatedAuthor = await Author.findOneAndUpdate(
            {
                id: newAuthor
            },
            {
                $addToSet: {
                    books: isbn
                }
            },  
            {
                new: true
            }
        );
        return res.json({
                books: updatedBook,
                authors: updateAuthor,
                message: "New author was added into the database"
        })
});

// route       '/book/delete/:isbn'
// desc        to delete a book
// access      public 
// params      isbn
// method      delete
// body        none 
Router.delete("/book/delete/:isbn", (req, res) => {
    const {isbn} = req.params;

    // const filtererBooks = Database.Book.filter((item) => item.ISBN !== isbn);
    const updateBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: isbn
        }
    )

    // Database.Book = filtererBooks;

    return res.json({books:updateBookDatabase});
});

/*
Route                   /book/delete/author
Description             delte an author from a book
Access                  PUBLIC
Parameters              id, isdn
Method                  DELETE
*/
Router.delete("/book/delete/author/:isbn/:id", (req, res) => {
    const { isbn, id } = req.params;

    //updating book database object
    // Database.Book.forEach((book) => {
    //     if (book.ISBN === isbn) {
    //         if (!book.authors.includes(parseInt(id))) {
    //             return;
    //         }

    //         book.authors = book.authors.filter(
    //             (databaseId) => databaseId !== parseInt(id)
    //         );
    //         return book;
    //     }
    //     return book;
    // });
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: isbn
        },
        {
            $pull: {
                authors: parseInt(id),
            }
        },
        {
            new: true
        }
    )

    

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(id)
        },
        {
            $pull: {
                books: isbn
            }
        },
        {
            new: true
        }
    )

    return res.json({message: "Author was deleted", book : updatedBook, author: updatedAuthor});
});

module.exports = Router;
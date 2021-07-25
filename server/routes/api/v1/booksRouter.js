import express from "express";

import Book from "../../../models/Book.js";

const booksRouter = new express.Router();
// router needs to be async  because we are awaiting the response from the find all method
booksRouter.get("/", async (req, res) => {
  try {
    //getting all of the books from our DB
    const books = await Book.findAll();
    //serving them up to our front in as an array of objects
    res.json({ books });
  } catch (error) {
    console.log(error);
  }
});
// needs to be async because we are calling on a method that is awaiting a promise
booksRouter.get("/:id", async (req, res) => {
  // get the page path number. inside of an object with the key of id. same id listed in line 18
  const bookId = req.params.id;
  try {
    // call the static method on the class book to fin the book with the id
    //it takes the book id var we defined on ine 20
    const book = await Book.findById(bookId);
    // serve it to the front in as an object as a response.
    res.status(200).json({ book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
});

// needs to be async because we will be calling a save method on it
booksRouter.post("/", async (req, res) => {
  try {
    // look and see what nonsense we type to test this
    console.log(req.body);
    // the request has the book form data in the body is where it lives the front end. sends a key value pair with a key of body. the value is the object that got stringafied.
    //have to make a new book out of it. using MVC principles here.
    const book = new Book(req.body);
    //just so we can see what this looks like
    const persistedBook = await book.save();
    //see line 37
    console.log(persistedBook);
    //serve  it to our front end.
    res.status(201).json({ book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error });
  }
});

export default booksRouter;

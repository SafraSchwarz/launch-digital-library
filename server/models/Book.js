import pg from "pg";
import _ from "lodash";

const pool = new pg.Pool({
  connectionString:
    "postgres://postgres:password@localhost:5432/launch_digital_library_development",
});

class Book {
  // make the object with a class book when data is received
  constructor({
    title,
    author,
    page_count,
    pageCount,
    description,
    id,
    fiction,
  }) {
    this.title = title;
    this.author = author;
    this.pageCount = page_count || pageCount;
    this.description = description;
    this.id = id;
    this.fiction = fiction;
  }
  // static method so we can call it outside of an instance of book
  // async because queries take time by going through the clients in the db
  static async findAll() {
    //try catch so we can see errors as we go.
    try {
      //result of find all. need to await because it accessing the db
      const result = await pool.query("SELECT * FROM books;");
      //get the array of books for the rows
      const booksData = result.rows;
      //map through to create new book object with the class book!
      // we need to do this so we have access to class functionalities as our app grows
      let books = booksData.map((book) => new this(book));
      //serve up the new book objects to the router.
      debugger;
      return books;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  //need to query to find a specific book using its id Then we can load the book show page
  //needs to take an ID as the arg. can ge this from the req.params.id in the router
  static async findById(id) {
    try {
      //make a query string with place holders
      const queryString = `SELECT * FROM books WHERE id = $1;`;
      //make the query and input the necessary info we need
      const result = await pool.query(queryString, [id]);
      //get the info we need from the rows, comes in the form of an arr so need to index in
      const bookData = result.rows[0];
      // instantiate a new  book so we can send it out. MVC that stuff!
      const book = new Book(bookData);
      // send out this data from this method
      return book;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //this will be an instance method because it will be called on an instance of a book.
  // for example. a new book submission. save is the convention here.
  async save() {
    try {
      //make the string of the query so we do not get hacked. use placeholders. the $ is how it communicates with  the result line
      // need to tell the db to return the id it makes for it so we can add it to our new book object. this is helpful for scalability
      const queryString = `INSERT INTO books (title, author, page_count, description, fiction) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
      // async portion of this method. combining our string and replacing the $ with the information on this particular object. So we can use "this"!!!! how exciting.
      const result = await pool.query(queryString, [
        this.title,
        this.author,
        this.pageCount,
        this.description,
        this.fiction,
      ]);
      //returns an array of objects. not mapping over it so we have to index in.
      const newBookId = result.rows[0].id;
      // setting the id of the newly created book object to the id we get back from the db
      this.id = newBookId;
      // just in case we want to error handle later.
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Book;

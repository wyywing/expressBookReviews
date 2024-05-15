const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  
public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn=req.params.isbn
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author=req.params.author;
    if(author){
    let keysArray = Object.keys(books);
    let filteredBook=keysArray.filter(isbn=>books[isbn]["author"]===author
    )
    .map(isbn=>books[isbn])
    res.send(filteredBook);
    }
    else{
        res.send("Unable to find book!")
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title=req.params.title;
    if(title){
    let keysArray = Object.keys(books);
    let filteredBook=keysArray.filter(isbn=>books[isbn]["title"]===title
    )
    .map(isbn=>books[isbn])
    res.send(filteredBook);
    }
    else{
        res.send("Unable to find book!")
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn=req.params.isbn
    let book=books[isbn]
    if(book){
    res.send(book["reviews"])
    }
    else{
        res.send("Unable to find book!")
    }
});

module.exports.general = public_users;

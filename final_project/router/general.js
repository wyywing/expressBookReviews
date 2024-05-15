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
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(books)
        }, 1000);
      });
  myPromise.then((books)=>{res.send(books)});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn=req.params.isbn
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const author=req.params.author;
    if(author){
    let keysArray = Object.keys(books);
    let filteredBook=keysArray.filter(isbn=>books[isbn]["author"]===author
    )
    .map(isbn=>books[isbn])
          resolve(filteredBook)
        } else {
            reject("Unable to find book!");
        }}, 1000);
      });
    
    myPromise.then((filteredBook)=>{res.send(filteredBook)})
    .catch((error)=>{res.send(error)})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
    const title=req.params.title;
    if(title){
    let keysArray = Object.keys(books);
    let filteredBook=keysArray.filter(isbn=>books[isbn]["title"]===title
    )
    .map(isbn=>books[isbn])
    resolve(filteredBook);
    }
    else{
        reject("Unable to find book!")
    }},1000)
});
myPromise.then((filteredBook)=>{res.send(filteredBook)})
    .catch((error)=>{res.send(error)})
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

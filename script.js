const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read ? "I've read this book." : "I've yet to read this book."
}

function addBookToLibrary() {
  let userTitle = prompt("Enter the title of the book.");
  let userAuthor = prompt("Enter the book's author");
  let userPages= prompt("Enter the number of pages in the book.");
  let userRead = prompt("Have you read the book? (y/n)");

  let newBook = new Book(userTitle, userAuthor, userPages, userRead);
  myLibrary.push(newBook);
}

function displayPage() {
  // loop through myLibrary and display each book on the page.
}


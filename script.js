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

const tableLibrary = document.querySelector(".table-library");

function displayLibrary() {

  myLibrary.forEach((b) => {
    const tableRow = document.createElement('tr');
    
    const bookIndex = document.createElement('td');
    bookIndex.classList.add("index");
    bookIndex.textContent = myLibrary.indexOf(b + 1);
    
    const bookTitle = document.createElement('td');
    bookTitle.classList.add("title");
    bookTitle.textContent = b.title;

    const bookAuthor = document.createElement('td');
    bookAuthor.classList.add("author");
    bookAuthor.textContent = b.author;

    const bookPages = document.createElement('td');
    bookPages.classList.add("pages");
    bookPages.textContent = b.pages;
    
    const bookRead = document.createElement('td');
    bookRead.classList.add("read");
    bookRead.textContent = b.read;

    tableRow.appendChild(bookIndex)
    tableRow.appendChild(bookTitle);
    tableRow.appendChild(bookAuthor);
    tableRow.appendChild(bookPages);
    tableRow.appendChild(bookRead);

    tableLibrary.appendChild(tableRow);
  })
}

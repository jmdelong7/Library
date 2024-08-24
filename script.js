class Book1 {
  constructor(title, author, numOfPages, hasRead) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.hasRead = hasRead
    
    this.changeHasRead = function() {
      this.hasRead = !this.hasRead
    }
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(book) {
    this.books.push(book)
  }

  removeBook(title) {
    this.books = this.books.filter(book => book.title !== title)
  }
}

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read ? "I've read this book." : "I've yet to read this book."
}

Book.prototype.changeReadStatus = function (read) {
  this.read = read ? "I've read this book." : "I've yet to read this book."
}

const addBookModal = document.querySelector("#add-book");
const form = document.querySelector("#form");
const cancel = document.querySelector(".cancel-form");
const dialog = document.querySelector("#form-dialog");
const addBookSubmit = document.querySelector("button[type='submit'");

addBookModal.addEventListener("click", () => {
  dialog.showModal();
})

cancel.addEventListener("click", () => {
  dialog.close();
})

function addBookToLibrary(userTitle, userAuthor, userPages, userRead) {
  const newBook = new Book(userTitle, userAuthor, userPages, userRead);
  myLibrary.push(newBook);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const formDataTitle = formData.get("title");
  const formDataAuthor = formData.get("author");
  const formDataPages = formData.get("pages");
  const formDataRead = (formData.get("read") === "1") ? true : false;
  
  addBookToLibrary(formDataTitle, formDataAuthor, formDataPages, formDataRead);

  form.reset();

  displayLibrary();

})

const tableLibrary = document.querySelector(".table-library");
const tableHeader = document.querySelector(".table-header");

function displayLibrary() {

  const books = document.querySelectorAll("tr.book");
  for (const book of books) {
    book.parentNode.removeChild(book);
  };  

  myLibrary.forEach((b) => {
    const tableRow = document.createElement('tr');
    tableRow.classList.add("book");
    const libraryIndex = myLibrary.indexOf(b) + 1;
    const indexClassName = "book-" + libraryIndex;

    const bookRemove = document.createElement('td');
    bookRemove.classList.add("remove", indexClassName);
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    bookRemove.appendChild(removeButton);
        
    const bookTitle = document.createElement('td');
    bookTitle.classList.add("title", indexClassName);
    bookTitle.textContent = b.title;

    const bookAuthor = document.createElement('td');
    bookAuthor.classList.add("author", indexClassName);
    bookAuthor.textContent = b.author;

    const bookPages = document.createElement('td');
    bookPages.classList.add("pages", indexClassName);
    bookPages.textContent = b.pages;
    
    const bookRead = document.createElement('td');
    bookRead.classList.add("read", indexClassName);
    bookRead.textContent = b.read;
    
    const bookChange = document.createElement('td');
    const changeButton = document.createElement('button');
    bookChange.classList.add("change", indexClassName);
    changeButton.textContent = "Change";
    bookChange.appendChild(changeButton)

    tableRow.appendChild(bookRemove);
    tableRow.appendChild(bookTitle);
    tableRow.appendChild(bookAuthor);
    tableRow.appendChild(bookPages);
    tableRow.appendChild(bookRead);
    tableRow.appendChild(bookChange);

    tableLibrary.appendChild(tableRow);

    removeBook(removeButton, tableRow);
    changeButton.addEventListener("click", () => {
      changeReadStatus(b);
      bookRead.textContent = b.read;
    });
  })
}

function removeBook(bookRemoveBtn, tableRow) {
  bookRemoveBtn.addEventListener("click", () => {
    tableLibrary.removeChild(tableRow);
  });
}

function changeReadStatus(book) {
  let bookReadText = book.read; // I've read or I've not read
  book.changeReadStatus(false); // I've not read
  if (bookReadText === book.read) { // If both false
    book.changeReadStatus(true); // Change true
  } else {book.changeReadStatus(false)} // Else change false
}






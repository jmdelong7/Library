const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
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
    tableRow.classList.add("book")

    const bookRemove = document.createElement('td');
    bookRemove.classList.add("remove");
    const bookRemoveBtn = document.createElement('button')
    bookRemoveBtn.textContent = "Remove";
    bookRemove.appendChild(bookRemoveBtn);
    
    const bookIndex = document.createElement('td');
    bookIndex.classList.add("index");
    bookIndex.textContent = myLibrary.indexOf(b) + 1;
    
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

    tableRow.appendChild(bookRemove);
    tableRow.appendChild(bookIndex)
    tableRow.appendChild(bookTitle);
    tableRow.appendChild(bookAuthor);
    tableRow.appendChild(bookPages);
    tableRow.appendChild(bookRead);

    tableLibrary.appendChild(tableRow);

    removeBook(bookRemoveBtn, tableRow);
  })
}

function removeBook(bookRemoveBtn, tableRow) {
  bookRemoveBtn.addEventListener("click", () => {
    tableLibrary.removeChild(tableRow)
  });
}




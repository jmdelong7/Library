const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read ? "I've read this book." : "I've yet to read this book."
}

function addBookToLibrary() {
  let userTitle = document.querySelector("#title");
  let userAuthor = document.querySelector("#author");
  let userPages= document.querySelector("#pages");
  let userReadYes = document.querySelector("#read-yes");
  let userReadNo = document.querySelector("#read-no");

  let newBook = new Book(userTitle, userAuthor, userPages, userRead);
  myLibrary.push(newBook);
}

const tableLibrary = document.querySelector(".table-library").textContent;

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const formDataTitle = formData.get("title");
  const formDataAuthor = formData.get("author");
  const formDataPages = formData.get("pages");
  const formDataRead = (formData.get("read") === "1") ? true : false;

  console.log(formDataTitle, formDataAuthor, formDataPages, formDataRead)  
})





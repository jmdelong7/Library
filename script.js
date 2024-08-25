class Book {
  constructor(title, author, numOfPages, hasRead) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.hasRead = hasRead
  }

  changeHasRead() {
    this.hasRead = !this.hasRead
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(book) {
    this.books.push(book)
  }

  removeBook(index) {
    this.books = this.books.filter(book => this.books.indexOf(book) !== index)
  }
}

class FormHandler {
  constructor(formData) {
    this.formData = formData
  }

  getFormEntries() {
    const formEntries = {}
    for (let [key, value] of this.formData.entries()) {
      formEntries[key] = value
    }
    return formEntries
  }

}

class BookFormHandler {
  constructor(formId) {
    this.bookForm = document.getElementById(formId)
  }

  getFormDataAsMap() {
    const formData = new FormData(this.bookForm)
    const formDataMap = new Map()
    for (const [key, value] of formData.entries()) {
      formDataMap.set(key, value)
    }
    return formDataMap
  }

  onSubmit(callback) {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault()
      const formData = this.getFormDataAsMap()
      callback(formData)
    })
  }
}

class PageController {
  constructor(library) {
    this.library = library
    this.addBookButton = document.getElementById("add-book")
    this.cancelButton = document.getElementById("cancel-form")
    this.dialog = document.getElementById("form-dialog")

    this.addBookButton.addEventListener("click", () => {
      dialog.showModal()
    })

    this.cancelButton.addEventListener("click", () => {
      dialog.close()
    })
  }
}

const library = new Library()
const PageController = PageController(library)

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






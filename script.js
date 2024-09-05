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
  constructor(formId, library) {
    this.formElement = document.getElementById(formId)
    this.library = library
    this.onSubmit()
  }
  
  getFormEntries(formData) {
    const formEntries = []
    for (let pair of formData.entries()) {
      formEntries.push(pair[1])
    }
    return formEntries
  }

  onSubmit() {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault()
      let formData = new FormData(this.formElement)
      this.addBookToLibrary(this.makeBookFromForm(formData))
      this.formElement.reset()
    })
  }

  makeBookFromForm(formData) {
    let formDataEntries = this.getFormEntries(formData)
    return new Book(...formDataEntries)
  }

  addBookToLibrary(book) {
    this.library.addBook(book)
  }
}

class ModalHandler {
  constructor(addBookButtonElement, dialogElement, cancelButtonElement) {
    this.addBookButton = document.getElementById(addBookButtonElement)
    this.dialogElement = document.getElementById(dialogElement)
    this.cancelButton = document.getElementById(cancelButtonElement)
    
    this.addBookListener()
    this.cancelButtonListener()
  }

  addBookListener() {
    this.addBookButton.addEventListener("click", () => {
      this.dialogElement.showModal()
    })
  }

  cancelButtonListener() {
    this.cancelButton.addEventListener("click", () => {
      this.dialogElement.close()
    })
  }
}

class LibraryDisplay {
  constructor(library, libraryID) {
    this.library = library
    this.libraryElement = document.getElementById(libraryID)
  }

  createTableColumn() {
    return document.createElement('td')
  }

  createBookData(book) {
    const bookElements = {}
    const removeCol = this.createTableColumn().appendChild(
      document.createElement('button')
    )
    removeCol.textContent = "Remove"
    bookElements["remove"] = removeCol
    
    for (let [key, value] of Object.entries(book)) {
      const tData = this.createTableColumn()
      tData.textContent = value
      bookElements[key] = tData
    }
    
    const changeCol = this.createTableColumn().appendChild(
      document.createElement('button')
    )
    changeCol.textContent = "Change"
    bookElements["change"] = changeCol
    
    return bookElements
  }
  
  createTableRow(bookElements) {
    const tableRow = document.createElement('tr')
    Object.keys(bookElements).forEach( (key) => {
      tableRow.appendChild(bookElements[key])
    })
    this.libraryElement.appendChild(tableRow)
  }
}

const modal = new ModalHandler("add-book", "form-dialog", "cancel-form", "submit-form")
const library = new Library()
const formData = new FormHandler("book-form", library)
const libraryDisplay = new LibraryDisplay(library, "table-library")

/* 

(function addBookCancelButtonListeners() {
  const addBookButton = document.getElementById("add-book")
  const dialogElement = document.getElementById("form-dialog")
  addBookButton.addEventListener("click", () => {
    dialogElement.showModal()
  })

  const cancelButton = document.getElementById("cancel-form")
  cancelButton.addEventListener("click", () => {
    dialogElement.close()
  })
})()

*/





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






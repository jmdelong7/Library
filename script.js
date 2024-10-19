class Book {
  constructor(title, author, numOfPages, hasRead) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.hasRead = hasRead
  }

  toggleRead() {
    this.hasRead = !this.hasRead
  }
}

class Library {
  constructor(tableId) {
    this.books = []
    this.table = document.getElementById(tableId)
  }

  addBook(book) {
    this.books.push(book)
  }

  removeBook(index) {
    this.books.splice(index, 1)
  }

  displayBook(book) {
    const row = this.table.insertRow()
    const bookData = [book.title, book.author, book.numOfPages, book.hasRead]

    for (let data of bookData) {
      const cell = row.insertCell()
      cell.textContent = data
    }

    const firstCell = row.insertCell(0)
    const lastCell = row.insertCell()

    const bookIndex = this.books.indexOf(book)
    this.addActionButton(firstCell, () => this.removeBook(bookIndex), "Remove")

    this.addActionButton(lastCell, () => book.toggleRead(), "Change")
  }

  addActionButton(row, action, buttonName) {
    const button = document.createElement("button")
    button.textContent = buttonName
    row.appendChild(button)

    button.addEventListener("click", () => {
      action()
      this.refreshDisplay()
    })
  }

  refreshDisplay() {
    const tableHeader = document.getElementById("table-header")
    this.table.innerHTML = ''
    this.table.appendChild(tableHeader)
    this.books.forEach(book => this.displayBook(book))
  }
}

class LibraryManager {
  constructor(tableId, addBookId, cancelId, formId, dialogId) {
    this.library = new Library(tableId)
    this.formElement = document.getElementById(formId)
    this.dialogElement = document.getElementById(dialogId)

    this.initModal(addBookId, cancelId)
    this.initSubmit()
  }

  initModal(addBookId, cancelId) {
    const addBookButton = document.getElementById(addBookId)
    const cancelButton = document.getElementById(cancelId)

    addBookButton.onclick = () => this.dialogElement.showModal()
    cancelButton.onclick = () => this.dialogElement.close()
  }

  initSubmit() {
    this.formElement.onsubmit = (event) => {
      event.preventDefault()
      const formData = new FormData(this.formElement)
      const bookData = [...formData.values()]
      const book = new Book(...bookData)
      this.library.addBook(book)
      this.formElement.reset()
      this.dialogElement.close()
      this.library.refreshDisplay()
    }
  }
}

function inputValidation(section, input) {
  const error = section.lastElementChild;
  if (input.checkValidity() === false && error.classList.contains('hidden')) {
    error.classList.remove('hidden');
  }
}

const library = new LibraryManager(
  "table-library",
  "add-book",
  "cancel-form",
  "book-form",
  "form-dialog"
)


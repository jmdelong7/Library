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

    for(let data of bookData) {
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


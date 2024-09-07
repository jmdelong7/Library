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

    row.insertCell()
    row.insertCell(0)
  }

  addActionButtons() {

  }

  displayLibrary() {
    this.books.forEach(book => {
      const bookRow = this.table.insertRow()
      
      for(let [key, value] of Object.entries(book)) {
        const cell = bookRow.insertCell()
        cell.className = key
        cell.textContent = value
      }
    })
  }
}


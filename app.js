const library = [];
const bookBtn = document.querySelector('.btnAddBook');
const bookHolder = document.querySelector('.book-holder');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

function Book(title, author, numOfPages, isRead = false, uniqueId) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
  this.uniqueId = uniqueId;
}

function addBookToLibrary(title, author, numOfPages, isread) {
  const id = crypto.randomUUID();
  const newBook = new Book(title, author, numOfPages, isread, id);
  library.push(newBook);
  return newBook;
}

function createBookCard(book) {
  let holderDiv = document.createElement("div");
  holderDiv.classList.add("book");
  // let isReadBtn = document.createElement('button');
  // isReadBtn.textContent = isRead ? 'I haven\'t read it' : 'I have read it';
  // isReadBtn.classList.add(isRead ? 'readBtn' : 'notReadBtn');
  // isReadBtn.addEventListener('click', () => {
  //   if (isRead) {
  //     book.isRead.textContent = 'You haven\'t read the book';
  //   } else {
  //     book.isRead.textContent = 'You have read the book';
  //   }
  // })
  
  // let removeBtn = document.createElement("button");
  // removeBtn.textContent = "Remove this book.";
  // removeBtn.classList.add("removeBtn");
  // removeBtn.addEventListener("click", () => {
  //   holderDiv.remove();
  //   // Checking how to remove the right book
  //   library.pop();
  //   console.log(library);
  // });

  for(let key in book) {
    if (key === 'uniqueId') continue;
    let div = document.createElement('div');

    switch(key) {
      case 'title': 
        div.textContent = `Title: ${book[key]}`
        holderDiv.append(div);
        break;

      case 'author':
        div.textContent = `Author: ${book[key]}`
        holderDiv.append(div);
        break;

      case 'numOfPages':
        div.textContent = `Number of Pages: ${book[key]}`
        holderDiv.append(div);
        break;

      case 'isRead':
        div.textContent = book[key]
          ? "You have read the book."
          : "You haven't read the book yet.";
        break;

      default:
        div.textContent = `${key}: ${book[key]}`;
    }
    holderDiv.append(div);
  }
  //  
  // holderDiv.append(removeBtn);
  bookHolder.append(holderDiv);
  // A log to check library, to be removed later
  console.log(library);
}

bookBtn.addEventListener('click', () => dialog.showModal());

form.addEventListener("submit", function handleForm(event) {
  event.preventDefault();

  let title = document.getElementById("title").value;
  let author = document.getElementById('author').value;
  let numOfPages = document.getElementById('number-of-pages').value;
  let isread = document.getElementById('read-or-not').checked;

  const newBook = addBookToLibrary(title, author, numOfPages, isread);
  createBookCard(newBook);
  form.reset();
  dialog.close();
});
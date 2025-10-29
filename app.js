let library = [];
const bookBtn = document.querySelector('.btnAddBook');
const bookHolder = document.querySelector('.book-holder');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

let title = document.getElementById('title');
title.addEventListener('input', () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Please fill out the title of your book.');
  } else {
    title.setCustomValidity('');
  }
});

let author = document.getElementById('author');
author.addEventListener('input', () => {
  if (author.validity.valueMissing) {
    author.setCustomValidity('Please fill out the author of your book.');
  } else {
    author.setCustomValidity('');
  }
});

let numOfPages = document.getElementById('number-of-pages');
numOfPages.addEventListener('input', () => {
  if (numOfPages.validity.valueMissing) {
    numOfPages.setCustomValidity(
      'Please fill out the number of pages of your book.'
    );
  } else {
    numOfPages.setCustomValidity('');
  }
});

class Book {
  constructor(title, author, numOfPages, isRead = false, uniqueId) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.uniqueId = uniqueId;
  }
}

function addBookToLibrary(title, author, numOfPages, isread) {
  const id = crypto.randomUUID();
  const newBook = new Book(title, author, numOfPages, isread, id);
  library.push(newBook);
  return newBook;
}

function createBookCard(book) {
  let holderDiv = document.createElement('div');
  holderDiv.classList.add('book');

  let btnHolderDiv = document.createElement('div');
  btnHolderDiv.classList.add('btnHolder');

  let removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('removeBtn');
  removeBtn.dataset.id = book.uniqueId;

  let isReadBtn = document.createElement('button');
  isReadBtn.textContent = book.isRead ? "I haven't read it" : 'I have read it';
  isReadBtn.classList.add(book.isRead ? 'notReadBtn' : 'readBtn');
  isReadBtn.addEventListener('click', () => {
    book.isRead = !book.isRead;

    isReadBtn.textContent = book.isRead
      ? "I haven't read it"
      : 'I have read it';
    let statusDiv = document.querySelector('.read-status');
    statusDiv.textContent = book.isRead
      ? 'You have read the book'
      : "You haven't read the book";

    isReadBtn.classList.remove(book.isRead ? 'readBtn' : 'notReadBtn');
    isReadBtn.classList.add(book.isRead ? 'notReadBtn' : 'readBtn');
  });

  removeBtn.addEventListener('click', () => {
    if (removeBtn.dataset.id === book.uniqueId) {
      holderDiv.remove();
      library = library.filter(
        (bookObj) => bookObj.uniqueId !== removeBtn.dataset.id
      );
    }
    console.log(library);
  });

  for (let key in book) {
    if (key === 'uniqueId') continue;
    let div = document.createElement('div');

    switch (key) {
      case 'title':
        div.textContent = `Title: ${book[key]}`;
        holderDiv.append(div);
        break;

      case 'author':
        div.textContent = `Author: ${book[key]}`;
        holderDiv.append(div);
        break;

      case 'numOfPages':
        div.textContent = `Number of Pages: ${book[key]}`;
        holderDiv.append(div);
        break;

      case 'isRead':
        div.classList.add('read-status');
        div.textContent = book[key]
          ? 'You have read the book.'
          : "You haven't read the book yet.";
        break;

      default:
        div.textContent = `${key}: ${book[key]}`;
    }
    holderDiv.append(div);
  }
  btnHolderDiv.append(isReadBtn);
  btnHolderDiv.append(removeBtn);
  holderDiv.append(btnHolderDiv);
  bookHolder.append(holderDiv);
}

bookBtn.addEventListener('click', () => dialog.showModal());

form.addEventListener('submit', function handleForm(event) {
  event.preventDefault();

  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let numOfPages = document.getElementById('number-of-pages').value;
  let isread = document.getElementById('read-or-not').checked;

  const newBook = addBookToLibrary(title, author, numOfPages, isread);
  createBookCard(newBook);
  form.reset();
  dialog.close();
});

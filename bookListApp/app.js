import { Book } from "./classes.js";
// local vars
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const isbnInput = document.querySelector("#isbn");
const BooksContainerEl = document.querySelector("#book-list");
const alertEl = document.querySelector("#bookAlert");

// UI Store: Handel UI Tasks
const BOOKS_STORE = {
   get books() {
      return localStorage.books ? JSON.parse(localStorage.books) : [];
   },
   set books(books) {
      localStorage.books = JSON.stringify(books);
   },
   addBook(book) {
      const newestBooks = BOOKS_STORE.books;
      newestBooks.push(book);
      BOOKS_STORE.books = newestBooks;
   },
   removeBook(targetBook) {
      const newestBooks = this.books.filter((book) => {
         return !(
            targetBook.title === book.title &&
            targetBook.author === book.author &&
            targetBook.isbn === book.isbn
         );
      });
      BOOKS_STORE.books = newestBooks;
   },
};
// UI Object: Handel UI Tasks
const UI = {
   init() {
      BOOKS_STORE.books.forEach((book) => UI.addBookToList(book, true));
   },

   addBookToList(book, isBookInStore = false) {
      const obj = new Book(book.title, book.author, book.isbn);

      // Handel STORAGE
      if (!isBookInStore) BOOKS_STORE.addBook(book);

      obj.el.addEventListener("click", (e) => {
         if (e.target.classList.contains("delete")) UI.deleteBook(obj);
      });

      BooksContainerEl.append(obj.render());
   },
   clearFields() {
      titleInput.value = "";
      authorInput.value = "";
      isbnInput.value = "";
   },
   deleteBook(book) {
      // remove from dom
      book.el.remove();
      // remove from STORE
      BOOKS_STORE.removeBook(book);

      UI.alert("Book Removed", "success");
   },
   alert(messege, type) {
      if (alertEl.dataset.id) {
         clearTimeout(alertEl.dataset.id);
      }
      alertEl.textContent = messege;
      alertEl.className = `alert alert-${type}`;

      alertEl.dataset.id = setTimeout(() => {
         alertEl.textContent = alertEl.className = alertEl.dataset.id = "";
      }, 1500);
   },
};

// initialization
UI.init();

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
   const title = titleInput.value, author = authorInput.value, isbn = isbnInput.value;

   e.preventDefault();
   
   if (title && author && isbn) {
      UI.addBookToList({ title, author, isbn });
      UI.clearFields();
      UI.alert("Book Added", "success");
   } else {
      UI.alert("Please fill in all fields", "danger");
   }
});

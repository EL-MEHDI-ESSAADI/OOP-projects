// Book Class: Represent a Book
class Book {
   constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.el = document.createElement("tr");

   }
   render() {
      this.el.innerHTML = `
      <td>${this.title}</td>
      <td>${this.author}</td>
      <td>${this.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `
      return this.el;
   }

}




export {Book};
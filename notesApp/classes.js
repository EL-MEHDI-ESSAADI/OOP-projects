/* eslint-disable no-unused-vars */
const noteBgColors = ["#FEFEFF", "#eef6fb", "#FED99B", "#fbd5d0"];

class Note {
   constructor(value, date, bgId, id) {
      this.date = date;
      this.id = id;
      this.el = document.createElement("div");

      this.el.classList.add("note__container");
      this.el.style.setProperty("background-color", noteBgColors[bgId]);
      this.el.innerHTML = `
      <header class="note__header">
      <div class="note__title">${date}</div>
      <a class="note__delete" data-note="note1" href="#delete">-</a>
   </header>
   <div class="note__body"><div class="note__content" contenteditable="true">${value}</div></div>
   <footer class="note__footer">
      <a
         class="note__colour-picker"
         data-bg-id="0"
         href="#colour"
         title="pale"
         style="background-color: #fefeff"
         >pale</a
      ><a
         class="note__colour-picker"
         data-bg-id="1"
         href="#colour"
         title="blue"
         style="background-color: #eef6fb"
         >blue</a
      ><a
         class="note__colour-picker"
         data-bg-id="2"
         href="#colour"
         title="beige"
         style="background-color: #fed99b"
         >beige</a
      ><a
         class="note__colour-picker"
         data-bg-id="3"
         href="#colour"
         title="red"
         style="background-color: #fbd5d0"
         >red</a
      >
   </footer>
      `;
      this.el.querySelector(`[data-bg-id="${bgId}"]`).classList.add("is--active");
   }

   render() {
      return this.el;
   }
   get value() {
      return this.el.querySelector(".note__content").innerText ;
   }
   set bgId(bgId) {
      this.el.querySelector(".is--active").classList.remove("is--active");
      this.el.style.setProperty("background-color", noteBgColors[bgId]);
      this.el.querySelector(`[data-bg-id="${bgId}"]`).classList.add("is--active");
   }
   get bgId() {
      return this.el.querySelector(".is--active").dataset.bgId;
   }

}

export { Note };

/* eslint-disable no-unused-vars */
import { Note } from "./classes.js";

const notesContainer = document.querySelector(".notes");
const addNoteBtn = document.querySelector("#btnAdd");

const NOTES_STORE = {
   get notes() {
      return localStorage.notes ? JSON.parse(localStorage.notes) : [];
   },
   set notes(notes) {
      localStorage.notes = JSON.stringify(notes);
   },
   addNote(note) {
      const newestNots = this.notes;
      newestNots.push(note);
      this.notes = newestNots;
   },
   removeNote(targetNote) {
      const newestNots = this.notes.filter((note) => note.id != targetNote.id);
      NOTES_STORE.notes = newestNots;
   },
   updateNote(targetNote) {
      const updatedNotes = NOTES_STORE.notes;
      updatedNotes.some((note) => {
         if (note.id === targetNote.id) {
            note.value = targetNote.value;
            note.bgId = targetNote.bgId;
            return true;
         }
      });
      NOTES_STORE.notes = updatedNotes;
   },
};

const NOTES = {
   init() {
      NOTES_STORE.notes.forEach((note) => this.addNote(note.value, note.date, note.bgId, note.id,true));
   },
   addNote(value, date, bgId, id, isNoteInStore=false) {
      const note = new Note(value, date, bgId, id);

      note.el
         .querySelector(".note__content")
         .addEventListener("input", () =>
            NOTES_STORE.updateNote({ value: note.value, date: note.date, bgId: note.bgId, id: note.id })
         );
      note.el.addEventListener("click", (e) => {
         // change bg
         if (e.target.classList.contains("note__colour-picker") && !e.target.classList.contains("is--active"))
            this.changeNoteBg(note, e.target.dataset.bgId);

         // remove note
         if (e.target.classList.contains("note__delete")) this.removeNote(note);
      });

      if (!isNoteInStore) NOTES_STORE.addNote({ value, date, bgId, id });

      notesContainer.append(note.render());
   },

   removeNote(note) {
      note.el.remove();
      NOTES_STORE.removeNote({ id: note.id });
   },
   changeNoteBg(note, bgId) {
      note.bgId = bgId;
      NOTES_STORE.updateNote({ value: note.value, date: note.date, bgId: note.bgId, id: note.id });
   },
};

addNoteBtn.addEventListener("click", () => NOTES.addNote("", new Date().toLocaleString(), 0, new Date().getTime()));

// init
NOTES.init();

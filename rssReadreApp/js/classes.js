/* eslint-disable no-unused-vars */

class Item extends EventTarget {
   constructor() {
      super();
      this.text = "";
      this.url = "";
      this.el = document.createElement("a");
      this.el.classList.add("list-group-item", "list-group-item-action");
      this.el.addEventListener("click", (e) => {
         e.preventDefault();

         this.dispatchEvent(new CustomEvent("activate"));
      });
   }
   render() {
      this.el.href = this.url;
      this.el.innerHTML = this.text;
      return this.el;
   }

   set active(value) {
      const method = value ? "add" : "remove";
      this.el.classList[method]("active");
   }
}

class Feed extends Item {
   constructor(feed) {
      super();
      this.text = feed.name;
      this.url = feed.url;
   }
}
class Article extends Item {
   constructor(article) {
      super();
      this.text = article.title; 
      this.url = article.title; 
      this.content = article.description; 
   }
}

class ItemContainer extends EventTarget {
   constructor(selector) {
      super();
      this.el = document.querySelector(selector);
      this.items = [];
   }

   itemFactory(item) {}

   loadItems(items) {
      this.items = [];
      this.el.innerHTML = ""
      items.forEach((item) => {
         const obj = this.itemFactory(item);

         obj.addEventListener("activate", (e) => {
            this.setActiveItem(e.target);
         });

         this.items.push(obj);
         this.el.appendChild(obj.render());
      });
   }

   setActiveItem(target) {
      this.items.forEach((item) => {
         item.active = item === target;
      });

      const event = new CustomEvent("selectedItemChanged", {
         detail: target,
      });
      this.dispatchEvent(event);
   }
}

class FeedContainer extends ItemContainer {
   constructor(selector) {
      super(selector);
   }

   itemFactory(item) {
      return new Feed(item);
   }
}

class ArticleContainer extends ItemContainer {
   constructor(selector) {
      super(selector);
   }

   itemFactory(item) {
      return new Article(item);
   }
}

export { FeedContainer, ArticleContainer };

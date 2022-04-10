import { FeedContainer, ArticleContainer } from "./classes.js";

const app = {
   articles: new ArticleContainer("#article-list-container"),
   feeds: new FeedContainer("#feed-list-container"),
   init() {
      this.articles.addEventListener("selectedItemChanged", (e) => {
         this.loadContent(e.detail);
      });
      this.feeds.addEventListener("selectedItemChanged", (e) => {
         this.loadFeed(e.detail);
      });
      this.fetchFeeds();
   },
   fetchFeeds() {
      handelData("/js/feeds.json", (feeds) => this.loadFeeds(feeds));
   },
   loadFeeds(feeds) {
      this.feeds.loadItems(feeds);
   },
   loadFeed(feed) {
      const parseApi = `https://rss-to-json-serverless-api.vercel.app/api?feedURL=${feed.url}`;

      handelData(parseApi, (result) => {
         this.articles.loadItems(result.items);
      });
   },
   loadContent(article) {
      document.getElementById("reading-container").innerHTML = article.content;
   },
};

app.init();

function handelData(url, successGetData) {
   fetchData(url)
      .then(successGetData)
      .catch((err) => {
         console.error(err);
         if (err instanceof RangeError) window.alert(err.message);
      });
}

// fetch data
async function fetchData(url) {
   const response = await fetch(url);
   // throw a range error because respinse.og is out of the range 200-299
   if (!response.ok) throw new RangeError(`${response.status} request error`);
   return await response.json();
}
